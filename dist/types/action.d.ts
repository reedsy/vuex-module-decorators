/**
 * Parameters that can be passed to the @Action decorator
 */
export interface ActionDecoratorParams {
    commit?: string;
    rawError?: boolean;
    root?: boolean;
}
export declare function Action<T, F extends (...args: any[]) => any>(target: T, key: string | symbol, descriptor: TypedPropertyDescriptor<F>): void;
export declare function Action<T>(params: ActionDecoratorParams): MethodDecorator;
