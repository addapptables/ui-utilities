import { Subject, Observable } from 'rxjs';

export interface CommunicateServiceModel<T> {
    observable: Observable<T>;
    communicateSource: Subject<T>;
    name: string;
}
