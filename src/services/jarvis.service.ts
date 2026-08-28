import { env } from "../config/env";
import { SendMessageToJarvisDTO } from "../entities/jarvis.entity";

export class JarvisService {
    public async sendMessage(payload: SendMessageToJarvisDTO): Promise<boolean> {
        const url = `${this.getJarvisUrl()}/whatsapp/send`;
        const jidId = this.getUserJidId();
        const jarvisAdminKey = this.getJarvisAdminKey();

        const { content } = payload;

        try {
            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': jarvisAdminKey,
                },
                body: JSON.stringify({
                    phone: jidId,
                    message: content
                }),
            });

            if (!request.ok) {
                console.error('[JarvisService] - Failed to send message to Jarvis. Status:', request.status, request.statusText);
                return false;
            }

            return true;
        } catch (error) {
            console.error('[JarvisService] - Error sending message to Jarvis: ', error);
            return false;
        }
    }

    private getJarvisUrl(): string {
        return env.JARVIS.JARVIS_URL;
    }

    private getUserJidId(): string {
        if (!env.JARVIS.USER_JID) {
            throw new Error("USER_JID should be provided in the environment variables.");
        }
        return env.JARVIS.USER_JID;
    }

    private getJarvisAdminKey(): string {
        if (!env.JARVIS.JARVIS_ADMIN_KEY) {
            throw new Error("JARVIS_ADMIN_KEY should be provided in the environment variables.");
        }
        return env.JARVIS.JARVIS_ADMIN_KEY;
    }
}