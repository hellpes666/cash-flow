import { CreateOrderPayload } from './create-order.payload';

export class UpdateOrderPayload extends CreateOrderPayload {
	id: string;
}
