import { BaseEntity } from './../../shared';

export class JsonCustomer implements BaseEntity {
    constructor(
        public id?: number,
        public locationName?: string,
        public latitude?: number,
        public longitude?: number,
        public demand?: number,
    ) {
    }
}
