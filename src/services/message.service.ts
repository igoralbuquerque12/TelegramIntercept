import { IncomingMessageDTO } from "../entities/message.entity";

import { CriteriaService } from "./criteria.service";
import { JarvisService } from "./jarvis.service";

export class MessageService {
  private readonly criteriaService: CriteriaService;
  private readonly jarvisService: JarvisService;

  constructor(
    criteriaService: CriteriaService,
    jarvisService: JarvisService
  ) {
    this.criteriaService = criteriaService;
    this.jarvisService = jarvisService;
  }

  public async handleIncomingMessage(payload: IncomingMessageDTO): Promise<void> {
    const matchedCriteria = this.criteriaService.evaluate(payload);

    if (matchedCriteria.matches) {
      const content = `Um produto que você salvou foi encontrado no canal ${payload.senderName || 'desconhecido'}: ${payload.text}`;
      await this.jarvisService.sendMessage({ content });
    }
  }
}