import { BaseEntity } from './../../shared';

export class JsonMessage implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
    ) {
    }
}
