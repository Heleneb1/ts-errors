import { getErrorObject } from "./helpers/helpers";

interface Logger {
    error: (msg: string) => void;
    warn?: (msg: string) => void;
    info?: (msg: string) => void;
}
export class CustomError extends Error {
    statusCode?: number | undefined;
    details?: Record<string, unknown> | undefined;
    emoji: string;
    category?: string | undefined;
    defaultMsg?: string | undefined;


    // Config globale statique
    static settings = {
        showEmoji: false,
        defaultCompact: false,
        colorize: false,
    };
    // Logger externe statique
    private static externalLogger: any = null;

    static config(options: Partial<typeof CustomError.settings>) {
        this.settings = { ...this.settings, ...options };
    }

    // Méthode pour définir le logger externe

    static setLogger(loggerInstance: Logger, level: "error" | "warn" | "info" = "error") {
        if (typeof loggerInstance?.[level] !== "function") {
            throw new Error(`Le logger externe doit avoir une méthode .${level}()`);
        }
        CustomError.externalLogger = { instance: loggerInstance, level };
    }


    colorizeByStatusCode(str: string, statusCode?: number): string {
        if (!statusCode) return str;
        if (statusCode >= 500) return `\x1b[31m${str}\x1b[0m`; // rouge
        if (statusCode >= 400) return `\x1b[33m${str}\x1b[0m`; // jaune
        if (statusCode >= 300) return `\x1b[32m${str}\x1b[0m`; // vert
        return `\x1b[34m${str}\x1b[0m`; // bleu
    }
    constructor(message: any, statusCode?: number, details?: Record<string, unknown>) {

        // Si "message" est un objet → extraction intelligente
        // Si "message" est un objet → extraction intelligente
        if (message && typeof message === "object" && !(message instanceof Error)) {

            // 1. Details (si le paramètre n'est pas déjà rempli)
            if (!details && typeof message.details === "object") {
                details = message.details;
            }

            // 2. StatusCode
            const sc = message.statusCode ?? message.status;
            if (typeof sc === "number") {
                statusCode = sc;
            }

            // 3. Message
            const rawMsg =
                message.message ??
                message.msg ??
                message.error ??
                "Unexpected error";

            message =
                typeof rawMsg === "object"
                    ? JSON.stringify(rawMsg)
                    : rawMsg;
        }


        // Force string propre
        super(String(message));

        // Sécurisation du statusCode
        if (typeof statusCode !== "number" || isNaN(statusCode)) {
            statusCode = 500;
        }

        const errorObj = getErrorObject(statusCode);

        this.emoji = errorObj.emoji;
        this.category = errorObj.category;
        this.statusCode = statusCode;
        this.details = details;
        this.name = this.constructor.name;
        this.defaultMsg = errorObj.defaultMsg;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON(): object {
        return {
            emoji: this.emoji,
            name: this.name,
            statusCode: this.statusCode,
            details: this.details,
            message: this.message,
            category: this.category,
            defaultMsg: this.defaultMsg,
            timestamp: new Date().toISOString()
        };
    }
    formatDetails(details: Record<string, any>, maxLen = 30) {
        const str = JSON.stringify(details);
        if (str.length <= maxLen) return str;
        return str.slice(0, maxLen) + '...';
    }
    formatedMessage(compact: boolean = CustomError.settings.defaultCompact,
        showEmoji: boolean = CustomError.settings.showEmoji,
        colorize: boolean = CustomError.settings.colorize,

    ): string {

        const emoji = showEmoji ? this.emoji : "";
        let message = this.message;
        let status = String(this.statusCode || "—");
        let details = this.details ? this.formatDetails(this.details) : "—";
        let category = this.category || "—";

        if (colorize) {
            message = `\x1b[35m${this.message}\x1b[0m`;
            status = this.colorizeByStatusCode(status, this.statusCode);
            category = this.colorizeByStatusCode(category, this.statusCode);
            details = `\x1b[36m${details}\x1b[0m`;

        }

        const emojiPart = showEmoji ? `${emoji} ` : "";
        // Ajoute l’emoji au message si l’option est activée
        if (CustomError.settings.showEmoji && this.emoji) {
            this.message = `${this.emoji} ${message}`;
        }
        return compact
            ? `${emojiPart}${message} [${status}] ${details}`
            : `${emojiPart}${message}\nStatusCode: ${status}\nDetails: ${details}`;
    }

    log(
        compact: boolean = CustomError.settings.defaultCompact,
        showEmoji: boolean = CustomError.settings.showEmoji,
        colorize: boolean = CustomError.settings.colorize
    ): void {
        if (compact) {
            console.log(this.formatedMessage(compact, showEmoji, colorize));
            return;
        }

        // Texte brut pour le calcul de largeur
        const messagePlain = this.message.replace(/\x1b\[[0-9;]*m/g, "");
        const detailsPlain = this.details ? this.formatDetails(this.details) : "—";
        const categoryPlain = this.category || "—";
        const statusPlain = String(this.statusCode || "—");

        // Largeurs des colonnes
        const colWidths = {
            emoji: 2,
            message: Math.max(messagePlain.length, "Message".length),
            status: Math.max(statusPlain.length, "StatusCode".length),
            details: Math.max(detailsPlain.length, "Details".length),
            category: Math.max(categoryPlain.length, "Category".length),
        };

        const pad = (str: string, width: number) => {
            const visibleLength = [...str.replace(/\x1b\[[0-9;]*m/g, "")].length;
            return visibleLength >= width ? str : str + " ".repeat(width - visibleLength);
        };

        const line = `+${"-".repeat(colWidths.emoji + 2)}+${"-".repeat(colWidths.message + 2)}+${"-".repeat(colWidths.status + 2)}+${"-".repeat(colWidths.details + 2)}+${"-".repeat(colWidths.category + 2)}+`;

        console.log(line);
        console.log(
            `| ${pad("", colWidths.emoji)} | ${pad("Message", colWidths.message)} | ${pad(
                "StatusCode",
                colWidths.status
            )} | ${pad("Details", colWidths.details)} | ${pad("Category", colWidths.category)} |`
        );
        console.log(line);

        const emojiStr = showEmoji ? this.emoji : "";
        const messageStr = colorize ? `\x1b[35m${messagePlain}\x1b[0m` : messagePlain;
        const statusStr = colorize
            ? this.colorizeByStatusCode(statusPlain, this.statusCode ?? 0)
            : statusPlain;
        const detailsStr = colorize ? `\x1b[36m${detailsPlain}\x1b[0m` : detailsPlain;
        const categoryStr = colorize
            ? this.colorizeByStatusCode(categoryPlain, this.statusCode ?? 0)
            : categoryPlain;


        console.log(
            `| ${pad(emojiStr, colWidths.emoji)} | ${pad(messageStr, colWidths.message)} | ${pad(
                statusStr,
                colWidths.status
            )} | ${pad(detailsStr, colWidths.details)} | ${pad(categoryStr, colWidths.category)} |`
        );
        console.log(line);
        // Affichage des détails complets si trop longs
        if (this.details) {
            const fullDetails = JSON.stringify(this.details, null, 2);
            if (fullDetails.length > 30) {
                const coloredDetails = colorize ? `\x1b[36m${fullDetails}\x1b[0m` : fullDetails;
                console.log("\nDetails (full):");
                console.log(coloredDetails);
            }
        }
        // Utilisation du logger externe si défini
        if (CustomError.externalLogger) {
            const { instance, level } = CustomError.externalLogger;
            instance[level](this.formatedMessage(compact, showEmoji, colorize));
        }
        const end = '\n';
        console.log(end);
    }

}


