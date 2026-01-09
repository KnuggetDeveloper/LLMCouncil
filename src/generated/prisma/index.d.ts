
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AvailableModel
 * 
 */
export type AvailableModel = $Result.DefaultSelection<Prisma.$AvailableModelPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectMemory
 * 
 */
export type ProjectMemory = $Result.DefaultSelection<Prisma.$ProjectMemoryPayload>
/**
 * Model Thread
 * 
 */
export type Thread = $Result.DefaultSelection<Prisma.$ThreadPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model UserWallet
 * 
 */
export type UserWallet = $Result.DefaultSelection<Prisma.$UserWalletPayload>
/**
 * Model SubscriptionPayment
 * 
 */
export type SubscriptionPayment = $Result.DefaultSelection<Prisma.$SubscriptionPaymentPayload>
/**
 * Model CreditUsage
 * 
 */
export type CreditUsage = $Result.DefaultSelection<Prisma.$CreditUsagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AvailableModels
 * const availableModels = await prisma.availableModel.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AvailableModels
   * const availableModels = await prisma.availableModel.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.availableModel`: Exposes CRUD operations for the **AvailableModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailableModels
    * const availableModels = await prisma.availableModel.findMany()
    * ```
    */
  get availableModel(): Prisma.AvailableModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMemory`: Exposes CRUD operations for the **ProjectMemory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMemories
    * const projectMemories = await prisma.projectMemory.findMany()
    * ```
    */
  get projectMemory(): Prisma.ProjectMemoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.thread`: Exposes CRUD operations for the **Thread** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Threads
    * const threads = await prisma.thread.findMany()
    * ```
    */
  get thread(): Prisma.ThreadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userWallet`: Exposes CRUD operations for the **UserWallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWallets
    * const userWallets = await prisma.userWallet.findMany()
    * ```
    */
  get userWallet(): Prisma.UserWalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptionPayment`: Exposes CRUD operations for the **SubscriptionPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionPayments
    * const subscriptionPayments = await prisma.subscriptionPayment.findMany()
    * ```
    */
  get subscriptionPayment(): Prisma.SubscriptionPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditUsage`: Exposes CRUD operations for the **CreditUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditUsages
    * const creditUsages = await prisma.creditUsage.findMany()
    * ```
    */
  get creditUsage(): Prisma.CreditUsageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AvailableModel: 'AvailableModel',
    User: 'User',
    Project: 'Project',
    ProjectMemory: 'ProjectMemory',
    Thread: 'Thread',
    Message: 'Message',
    UserWallet: 'UserWallet',
    SubscriptionPayment: 'SubscriptionPayment',
    CreditUsage: 'CreditUsage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "availableModel" | "user" | "project" | "projectMemory" | "thread" | "message" | "userWallet" | "subscriptionPayment" | "creditUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AvailableModel: {
        payload: Prisma.$AvailableModelPayload<ExtArgs>
        fields: Prisma.AvailableModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailableModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailableModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          findFirst: {
            args: Prisma.AvailableModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailableModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          findMany: {
            args: Prisma.AvailableModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>[]
          }
          create: {
            args: Prisma.AvailableModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          createMany: {
            args: Prisma.AvailableModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailableModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>[]
          }
          delete: {
            args: Prisma.AvailableModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          update: {
            args: Prisma.AvailableModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          deleteMany: {
            args: Prisma.AvailableModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailableModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailableModelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>[]
          }
          upsert: {
            args: Prisma.AvailableModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailableModelPayload>
          }
          aggregate: {
            args: Prisma.AvailableModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailableModel>
          }
          groupBy: {
            args: Prisma.AvailableModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailableModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailableModelCountArgs<ExtArgs>
            result: $Utils.Optional<AvailableModelCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectMemory: {
        payload: Prisma.$ProjectMemoryPayload<ExtArgs>
        fields: Prisma.ProjectMemoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMemoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMemoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          findFirst: {
            args: Prisma.ProjectMemoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMemoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          findMany: {
            args: Prisma.ProjectMemoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>[]
          }
          create: {
            args: Prisma.ProjectMemoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          createMany: {
            args: Prisma.ProjectMemoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMemoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>[]
          }
          delete: {
            args: Prisma.ProjectMemoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          update: {
            args: Prisma.ProjectMemoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMemoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMemoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMemoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMemoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemoryPayload>
          }
          aggregate: {
            args: Prisma.ProjectMemoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMemory>
          }
          groupBy: {
            args: Prisma.ProjectMemoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMemoryCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemoryCountAggregateOutputType> | number
          }
        }
      }
      Thread: {
        payload: Prisma.$ThreadPayload<ExtArgs>
        fields: Prisma.ThreadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThreadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThreadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findFirst: {
            args: Prisma.ThreadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThreadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          findMany: {
            args: Prisma.ThreadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          create: {
            args: Prisma.ThreadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          createMany: {
            args: Prisma.ThreadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThreadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          delete: {
            args: Prisma.ThreadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          update: {
            args: Prisma.ThreadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          deleteMany: {
            args: Prisma.ThreadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThreadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThreadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>[]
          }
          upsert: {
            args: Prisma.ThreadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThreadPayload>
          }
          aggregate: {
            args: Prisma.ThreadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThread>
          }
          groupBy: {
            args: Prisma.ThreadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThreadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThreadCountArgs<ExtArgs>
            result: $Utils.Optional<ThreadCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      UserWallet: {
        payload: Prisma.$UserWalletPayload<ExtArgs>
        fields: Prisma.UserWalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          findFirst: {
            args: Prisma.UserWalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          findMany: {
            args: Prisma.UserWalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>[]
          }
          create: {
            args: Prisma.UserWalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          createMany: {
            args: Prisma.UserWalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>[]
          }
          delete: {
            args: Prisma.UserWalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          update: {
            args: Prisma.UserWalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          deleteMany: {
            args: Prisma.UserWalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserWalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>[]
          }
          upsert: {
            args: Prisma.UserWalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          aggregate: {
            args: Prisma.UserWalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWallet>
          }
          groupBy: {
            args: Prisma.UserWalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWalletCountArgs<ExtArgs>
            result: $Utils.Optional<UserWalletCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionPayment: {
        payload: Prisma.$SubscriptionPaymentPayload<ExtArgs>
        fields: Prisma.SubscriptionPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          findMany: {
            args: Prisma.SubscriptionPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>[]
          }
          create: {
            args: Prisma.SubscriptionPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          createMany: {
            args: Prisma.SubscriptionPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          update: {
            args: Prisma.SubscriptionPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPaymentPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionPayment>
          }
          groupBy: {
            args: Prisma.SubscriptionPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionPaymentCountAggregateOutputType> | number
          }
        }
      }
      CreditUsage: {
        payload: Prisma.$CreditUsagePayload<ExtArgs>
        fields: Prisma.CreditUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          findFirst: {
            args: Prisma.CreditUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          findMany: {
            args: Prisma.CreditUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>[]
          }
          create: {
            args: Prisma.CreditUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          createMany: {
            args: Prisma.CreditUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>[]
          }
          delete: {
            args: Prisma.CreditUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          update: {
            args: Prisma.CreditUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          deleteMany: {
            args: Prisma.CreditUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>[]
          }
          upsert: {
            args: Prisma.CreditUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditUsagePayload>
          }
          aggregate: {
            args: Prisma.CreditUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditUsage>
          }
          groupBy: {
            args: Prisma.CreditUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditUsageCountArgs<ExtArgs>
            result: $Utils.Optional<CreditUsageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    availableModel?: AvailableModelOmit
    user?: UserOmit
    project?: ProjectOmit
    projectMemory?: ProjectMemoryOmit
    thread?: ThreadOmit
    message?: MessageOmit
    userWallet?: UserWalletOmit
    subscriptionPayment?: SubscriptionPaymentOmit
    creditUsage?: CreditUsageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    threads: number
    messages: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    threads?: boolean | ProjectCountOutputTypeCountThreadsArgs
    messages?: boolean | ProjectCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountThreadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type ThreadCountOutputType
   */

  export type ThreadCountOutputType = {
    messages: number
  }

  export type ThreadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ThreadCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThreadCountOutputType
     */
    select?: ThreadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ThreadCountOutputType without action
   */
  export type ThreadCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type UserWalletCountOutputType
   */

  export type UserWalletCountOutputType = {
    subscriptionPayments: number
    creditUsage: number
  }

  export type UserWalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptionPayments?: boolean | UserWalletCountOutputTypeCountSubscriptionPaymentsArgs
    creditUsage?: boolean | UserWalletCountOutputTypeCountCreditUsageArgs
  }

  // Custom InputTypes
  /**
   * UserWalletCountOutputType without action
   */
  export type UserWalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWalletCountOutputType
     */
    select?: UserWalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserWalletCountOutputType without action
   */
  export type UserWalletCountOutputTypeCountSubscriptionPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionPaymentWhereInput
  }

  /**
   * UserWalletCountOutputType without action
   */
  export type UserWalletCountOutputTypeCountCreditUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditUsageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AvailableModel
   */

  export type AggregateAvailableModel = {
    _count: AvailableModelCountAggregateOutputType | null
    _avg: AvailableModelAvgAggregateOutputType | null
    _sum: AvailableModelSumAggregateOutputType | null
    _min: AvailableModelMinAggregateOutputType | null
    _max: AvailableModelMaxAggregateOutputType | null
  }

  export type AvailableModelAvgAggregateOutputType = {
    contextLength: number | null
  }

  export type AvailableModelSumAggregateOutputType = {
    contextLength: number | null
  }

  export type AvailableModelMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    contextLength: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailableModelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    contextLength: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailableModelCountAggregateOutputType = {
    id: number
    name: number
    description: number
    contextLength: number
    pricing: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AvailableModelAvgAggregateInputType = {
    contextLength?: true
  }

  export type AvailableModelSumAggregateInputType = {
    contextLength?: true
  }

  export type AvailableModelMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    contextLength?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailableModelMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    contextLength?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailableModelCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    contextLength?: true
    pricing?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AvailableModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableModel to aggregate.
     */
    where?: AvailableModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableModels to fetch.
     */
    orderBy?: AvailableModelOrderByWithRelationInput | AvailableModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailableModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailableModels
    **/
    _count?: true | AvailableModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvailableModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvailableModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailableModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailableModelMaxAggregateInputType
  }

  export type GetAvailableModelAggregateType<T extends AvailableModelAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailableModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailableModel[P]>
      : GetScalarType<T[P], AggregateAvailableModel[P]>
  }




  export type AvailableModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailableModelWhereInput
    orderBy?: AvailableModelOrderByWithAggregationInput | AvailableModelOrderByWithAggregationInput[]
    by: AvailableModelScalarFieldEnum[] | AvailableModelScalarFieldEnum
    having?: AvailableModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailableModelCountAggregateInputType | true
    _avg?: AvailableModelAvgAggregateInputType
    _sum?: AvailableModelSumAggregateInputType
    _min?: AvailableModelMinAggregateInputType
    _max?: AvailableModelMaxAggregateInputType
  }

  export type AvailableModelGroupByOutputType = {
    id: string
    name: string
    description: string | null
    contextLength: number | null
    pricing: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AvailableModelCountAggregateOutputType | null
    _avg: AvailableModelAvgAggregateOutputType | null
    _sum: AvailableModelSumAggregateOutputType | null
    _min: AvailableModelMinAggregateOutputType | null
    _max: AvailableModelMaxAggregateOutputType | null
  }

  type GetAvailableModelGroupByPayload<T extends AvailableModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailableModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailableModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailableModelGroupByOutputType[P]>
            : GetScalarType<T[P], AvailableModelGroupByOutputType[P]>
        }
      >
    >


  export type AvailableModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    contextLength?: boolean
    pricing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["availableModel"]>

  export type AvailableModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    contextLength?: boolean
    pricing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["availableModel"]>

  export type AvailableModelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    contextLength?: boolean
    pricing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["availableModel"]>

  export type AvailableModelSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    contextLength?: boolean
    pricing?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AvailableModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "contextLength" | "pricing" | "createdAt" | "updatedAt", ExtArgs["result"]["availableModel"]>

  export type $AvailableModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailableModel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      contextLength: number | null
      pricing: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["availableModel"]>
    composites: {}
  }

  type AvailableModelGetPayload<S extends boolean | null | undefined | AvailableModelDefaultArgs> = $Result.GetResult<Prisma.$AvailableModelPayload, S>

  type AvailableModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailableModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailableModelCountAggregateInputType | true
    }

  export interface AvailableModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailableModel'], meta: { name: 'AvailableModel' } }
    /**
     * Find zero or one AvailableModel that matches the filter.
     * @param {AvailableModelFindUniqueArgs} args - Arguments to find a AvailableModel
     * @example
     * // Get one AvailableModel
     * const availableModel = await prisma.availableModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailableModelFindUniqueArgs>(args: SelectSubset<T, AvailableModelFindUniqueArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailableModel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailableModelFindUniqueOrThrowArgs} args - Arguments to find a AvailableModel
     * @example
     * // Get one AvailableModel
     * const availableModel = await prisma.availableModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailableModelFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailableModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelFindFirstArgs} args - Arguments to find a AvailableModel
     * @example
     * // Get one AvailableModel
     * const availableModel = await prisma.availableModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailableModelFindFirstArgs>(args?: SelectSubset<T, AvailableModelFindFirstArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailableModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelFindFirstOrThrowArgs} args - Arguments to find a AvailableModel
     * @example
     * // Get one AvailableModel
     * const availableModel = await prisma.availableModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailableModelFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailableModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailableModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailableModels
     * const availableModels = await prisma.availableModel.findMany()
     * 
     * // Get first 10 AvailableModels
     * const availableModels = await prisma.availableModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availableModelWithIdOnly = await prisma.availableModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailableModelFindManyArgs>(args?: SelectSubset<T, AvailableModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailableModel.
     * @param {AvailableModelCreateArgs} args - Arguments to create a AvailableModel.
     * @example
     * // Create one AvailableModel
     * const AvailableModel = await prisma.availableModel.create({
     *   data: {
     *     // ... data to create a AvailableModel
     *   }
     * })
     * 
     */
    create<T extends AvailableModelCreateArgs>(args: SelectSubset<T, AvailableModelCreateArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailableModels.
     * @param {AvailableModelCreateManyArgs} args - Arguments to create many AvailableModels.
     * @example
     * // Create many AvailableModels
     * const availableModel = await prisma.availableModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailableModelCreateManyArgs>(args?: SelectSubset<T, AvailableModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailableModels and returns the data saved in the database.
     * @param {AvailableModelCreateManyAndReturnArgs} args - Arguments to create many AvailableModels.
     * @example
     * // Create many AvailableModels
     * const availableModel = await prisma.availableModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailableModels and only return the `id`
     * const availableModelWithIdOnly = await prisma.availableModel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailableModelCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailableModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailableModel.
     * @param {AvailableModelDeleteArgs} args - Arguments to delete one AvailableModel.
     * @example
     * // Delete one AvailableModel
     * const AvailableModel = await prisma.availableModel.delete({
     *   where: {
     *     // ... filter to delete one AvailableModel
     *   }
     * })
     * 
     */
    delete<T extends AvailableModelDeleteArgs>(args: SelectSubset<T, AvailableModelDeleteArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailableModel.
     * @param {AvailableModelUpdateArgs} args - Arguments to update one AvailableModel.
     * @example
     * // Update one AvailableModel
     * const availableModel = await prisma.availableModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailableModelUpdateArgs>(args: SelectSubset<T, AvailableModelUpdateArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailableModels.
     * @param {AvailableModelDeleteManyArgs} args - Arguments to filter AvailableModels to delete.
     * @example
     * // Delete a few AvailableModels
     * const { count } = await prisma.availableModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailableModelDeleteManyArgs>(args?: SelectSubset<T, AvailableModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailableModels
     * const availableModel = await prisma.availableModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailableModelUpdateManyArgs>(args: SelectSubset<T, AvailableModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailableModels and returns the data updated in the database.
     * @param {AvailableModelUpdateManyAndReturnArgs} args - Arguments to update many AvailableModels.
     * @example
     * // Update many AvailableModels
     * const availableModel = await prisma.availableModel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailableModels and only return the `id`
     * const availableModelWithIdOnly = await prisma.availableModel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvailableModelUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailableModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailableModel.
     * @param {AvailableModelUpsertArgs} args - Arguments to update or create a AvailableModel.
     * @example
     * // Update or create a AvailableModel
     * const availableModel = await prisma.availableModel.upsert({
     *   create: {
     *     // ... data to create a AvailableModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailableModel we want to update
     *   }
     * })
     */
    upsert<T extends AvailableModelUpsertArgs>(args: SelectSubset<T, AvailableModelUpsertArgs<ExtArgs>>): Prisma__AvailableModelClient<$Result.GetResult<Prisma.$AvailableModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailableModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelCountArgs} args - Arguments to filter AvailableModels to count.
     * @example
     * // Count the number of AvailableModels
     * const count = await prisma.availableModel.count({
     *   where: {
     *     // ... the filter for the AvailableModels we want to count
     *   }
     * })
    **/
    count<T extends AvailableModelCountArgs>(
      args?: Subset<T, AvailableModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailableModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailableModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvailableModelAggregateArgs>(args: Subset<T, AvailableModelAggregateArgs>): Prisma.PrismaPromise<GetAvailableModelAggregateType<T>>

    /**
     * Group by AvailableModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailableModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvailableModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailableModelGroupByArgs['orderBy'] }
        : { orderBy?: AvailableModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvailableModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailableModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailableModel model
   */
  readonly fields: AvailableModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailableModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailableModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvailableModel model
   */
  interface AvailableModelFieldRefs {
    readonly id: FieldRef<"AvailableModel", 'String'>
    readonly name: FieldRef<"AvailableModel", 'String'>
    readonly description: FieldRef<"AvailableModel", 'String'>
    readonly contextLength: FieldRef<"AvailableModel", 'Int'>
    readonly pricing: FieldRef<"AvailableModel", 'Json'>
    readonly createdAt: FieldRef<"AvailableModel", 'DateTime'>
    readonly updatedAt: FieldRef<"AvailableModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailableModel findUnique
   */
  export type AvailableModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter, which AvailableModel to fetch.
     */
    where: AvailableModelWhereUniqueInput
  }

  /**
   * AvailableModel findUniqueOrThrow
   */
  export type AvailableModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter, which AvailableModel to fetch.
     */
    where: AvailableModelWhereUniqueInput
  }

  /**
   * AvailableModel findFirst
   */
  export type AvailableModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter, which AvailableModel to fetch.
     */
    where?: AvailableModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableModels to fetch.
     */
    orderBy?: AvailableModelOrderByWithRelationInput | AvailableModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableModels.
     */
    cursor?: AvailableModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableModels.
     */
    distinct?: AvailableModelScalarFieldEnum | AvailableModelScalarFieldEnum[]
  }

  /**
   * AvailableModel findFirstOrThrow
   */
  export type AvailableModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter, which AvailableModel to fetch.
     */
    where?: AvailableModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableModels to fetch.
     */
    orderBy?: AvailableModelOrderByWithRelationInput | AvailableModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailableModels.
     */
    cursor?: AvailableModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailableModels.
     */
    distinct?: AvailableModelScalarFieldEnum | AvailableModelScalarFieldEnum[]
  }

  /**
   * AvailableModel findMany
   */
  export type AvailableModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter, which AvailableModels to fetch.
     */
    where?: AvailableModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailableModels to fetch.
     */
    orderBy?: AvailableModelOrderByWithRelationInput | AvailableModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailableModels.
     */
    cursor?: AvailableModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailableModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailableModels.
     */
    skip?: number
    distinct?: AvailableModelScalarFieldEnum | AvailableModelScalarFieldEnum[]
  }

  /**
   * AvailableModel create
   */
  export type AvailableModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * The data needed to create a AvailableModel.
     */
    data: XOR<AvailableModelCreateInput, AvailableModelUncheckedCreateInput>
  }

  /**
   * AvailableModel createMany
   */
  export type AvailableModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailableModels.
     */
    data: AvailableModelCreateManyInput | AvailableModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailableModel createManyAndReturn
   */
  export type AvailableModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * The data used to create many AvailableModels.
     */
    data: AvailableModelCreateManyInput | AvailableModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailableModel update
   */
  export type AvailableModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * The data needed to update a AvailableModel.
     */
    data: XOR<AvailableModelUpdateInput, AvailableModelUncheckedUpdateInput>
    /**
     * Choose, which AvailableModel to update.
     */
    where: AvailableModelWhereUniqueInput
  }

  /**
   * AvailableModel updateMany
   */
  export type AvailableModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailableModels.
     */
    data: XOR<AvailableModelUpdateManyMutationInput, AvailableModelUncheckedUpdateManyInput>
    /**
     * Filter which AvailableModels to update
     */
    where?: AvailableModelWhereInput
    /**
     * Limit how many AvailableModels to update.
     */
    limit?: number
  }

  /**
   * AvailableModel updateManyAndReturn
   */
  export type AvailableModelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * The data used to update AvailableModels.
     */
    data: XOR<AvailableModelUpdateManyMutationInput, AvailableModelUncheckedUpdateManyInput>
    /**
     * Filter which AvailableModels to update
     */
    where?: AvailableModelWhereInput
    /**
     * Limit how many AvailableModels to update.
     */
    limit?: number
  }

  /**
   * AvailableModel upsert
   */
  export type AvailableModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * The filter to search for the AvailableModel to update in case it exists.
     */
    where: AvailableModelWhereUniqueInput
    /**
     * In case the AvailableModel found by the `where` argument doesn't exist, create a new AvailableModel with this data.
     */
    create: XOR<AvailableModelCreateInput, AvailableModelUncheckedCreateInput>
    /**
     * In case the AvailableModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailableModelUpdateInput, AvailableModelUncheckedUpdateInput>
  }

  /**
   * AvailableModel delete
   */
  export type AvailableModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
    /**
     * Filter which AvailableModel to delete.
     */
    where: AvailableModelWhereUniqueInput
  }

  /**
   * AvailableModel deleteMany
   */
  export type AvailableModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailableModels to delete
     */
    where?: AvailableModelWhereInput
    /**
     * Limit how many AvailableModels to delete.
     */
    limit?: number
  }

  /**
   * AvailableModel without action
   */
  export type AvailableModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailableModel
     */
    select?: AvailableModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailableModel
     */
    omit?: AvailableModelOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    photoURL: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    photoURL: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    photoURL: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    photoURL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    photoURL?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    photoURL?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    photoURL: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    photoURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    photoURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    photoURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    photoURL?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "photoURL" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      wallet: Prisma.$UserWalletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      photoURL: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallet<T extends User$walletArgs<ExtArgs> = {}>(args?: Subset<T, User$walletArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly photoURL: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.wallet
   */
  export type User$walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    where?: UserWalletWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    userId: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    projectMemory?: boolean | Project$projectMemoryArgs<ExtArgs>
    threads?: boolean | Project$threadsArgs<ExtArgs>
    messages?: boolean | Project$messagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    projectMemory?: boolean | Project$projectMemoryArgs<ExtArgs>
    threads?: boolean | Project$threadsArgs<ExtArgs>
    messages?: boolean | Project$messagesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      projectMemory: Prisma.$ProjectMemoryPayload<ExtArgs> | null
      threads: Prisma.$ThreadPayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    projectMemory<T extends Project$projectMemoryArgs<ExtArgs> = {}>(args?: Subset<T, Project$projectMemoryArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    threads<T extends Project$threadsArgs<ExtArgs> = {}>(args?: Subset<T, Project$threadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Project$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Project$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly userId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.projectMemory
   */
  export type Project$projectMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    where?: ProjectMemoryWhereInput
  }

  /**
   * Project.threads
   */
  export type Project$threadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    cursor?: ThreadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Project.messages
   */
  export type Project$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMemory
   */

  export type AggregateProjectMemory = {
    _count: ProjectMemoryCountAggregateOutputType | null
    _min: ProjectMemoryMinAggregateOutputType | null
    _max: ProjectMemoryMaxAggregateOutputType | null
  }

  export type ProjectMemoryMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    summary: string | null
    updatedAt: Date | null
  }

  export type ProjectMemoryMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    summary: string | null
    updatedAt: Date | null
  }

  export type ProjectMemoryCountAggregateOutputType = {
    id: number
    projectId: number
    summary: number
    facts: number
    decisions: number
    openQuestions: number
    updatedAt: number
    _all: number
  }


  export type ProjectMemoryMinAggregateInputType = {
    id?: true
    projectId?: true
    summary?: true
    updatedAt?: true
  }

  export type ProjectMemoryMaxAggregateInputType = {
    id?: true
    projectId?: true
    summary?: true
    updatedAt?: true
  }

  export type ProjectMemoryCountAggregateInputType = {
    id?: true
    projectId?: true
    summary?: true
    facts?: true
    decisions?: true
    openQuestions?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectMemoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMemory to aggregate.
     */
    where?: ProjectMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemories to fetch.
     */
    orderBy?: ProjectMemoryOrderByWithRelationInput | ProjectMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMemories
    **/
    _count?: true | ProjectMemoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMemoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMemoryMaxAggregateInputType
  }

  export type GetProjectMemoryAggregateType<T extends ProjectMemoryAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMemory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMemory[P]>
      : GetScalarType<T[P], AggregateProjectMemory[P]>
  }




  export type ProjectMemoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemoryWhereInput
    orderBy?: ProjectMemoryOrderByWithAggregationInput | ProjectMemoryOrderByWithAggregationInput[]
    by: ProjectMemoryScalarFieldEnum[] | ProjectMemoryScalarFieldEnum
    having?: ProjectMemoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMemoryCountAggregateInputType | true
    _min?: ProjectMemoryMinAggregateInputType
    _max?: ProjectMemoryMaxAggregateInputType
  }

  export type ProjectMemoryGroupByOutputType = {
    id: string
    projectId: string
    summary: string
    facts: JsonValue
    decisions: JsonValue
    openQuestions: JsonValue
    updatedAt: Date
    _count: ProjectMemoryCountAggregateOutputType | null
    _min: ProjectMemoryMinAggregateOutputType | null
    _max: ProjectMemoryMaxAggregateOutputType | null
  }

  type GetProjectMemoryGroupByPayload<T extends ProjectMemoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMemoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMemoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMemoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMemoryGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMemorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    summary?: boolean
    facts?: boolean
    decisions?: boolean
    openQuestions?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMemory"]>

  export type ProjectMemorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    summary?: boolean
    facts?: boolean
    decisions?: boolean
    openQuestions?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMemory"]>

  export type ProjectMemorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    summary?: boolean
    facts?: boolean
    decisions?: boolean
    openQuestions?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMemory"]>

  export type ProjectMemorySelectScalar = {
    id?: boolean
    projectId?: boolean
    summary?: boolean
    facts?: boolean
    decisions?: boolean
    openQuestions?: boolean
    updatedAt?: boolean
  }

  export type ProjectMemoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "summary" | "facts" | "decisions" | "openQuestions" | "updatedAt", ExtArgs["result"]["projectMemory"]>
  export type ProjectMemoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMemoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMemoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectMemoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMemory"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      summary: string
      facts: Prisma.JsonValue
      decisions: Prisma.JsonValue
      openQuestions: Prisma.JsonValue
      updatedAt: Date
    }, ExtArgs["result"]["projectMemory"]>
    composites: {}
  }

  type ProjectMemoryGetPayload<S extends boolean | null | undefined | ProjectMemoryDefaultArgs> = $Result.GetResult<Prisma.$ProjectMemoryPayload, S>

  type ProjectMemoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMemoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMemoryCountAggregateInputType | true
    }

  export interface ProjectMemoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMemory'], meta: { name: 'ProjectMemory' } }
    /**
     * Find zero or one ProjectMemory that matches the filter.
     * @param {ProjectMemoryFindUniqueArgs} args - Arguments to find a ProjectMemory
     * @example
     * // Get one ProjectMemory
     * const projectMemory = await prisma.projectMemory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMemoryFindUniqueArgs>(args: SelectSubset<T, ProjectMemoryFindUniqueArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMemory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMemoryFindUniqueOrThrowArgs} args - Arguments to find a ProjectMemory
     * @example
     * // Get one ProjectMemory
     * const projectMemory = await prisma.projectMemory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMemoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMemoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMemory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryFindFirstArgs} args - Arguments to find a ProjectMemory
     * @example
     * // Get one ProjectMemory
     * const projectMemory = await prisma.projectMemory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMemoryFindFirstArgs>(args?: SelectSubset<T, ProjectMemoryFindFirstArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMemory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryFindFirstOrThrowArgs} args - Arguments to find a ProjectMemory
     * @example
     * // Get one ProjectMemory
     * const projectMemory = await prisma.projectMemory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMemoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMemoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMemories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMemories
     * const projectMemories = await prisma.projectMemory.findMany()
     * 
     * // Get first 10 ProjectMemories
     * const projectMemories = await prisma.projectMemory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectMemoryWithIdOnly = await prisma.projectMemory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectMemoryFindManyArgs>(args?: SelectSubset<T, ProjectMemoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMemory.
     * @param {ProjectMemoryCreateArgs} args - Arguments to create a ProjectMemory.
     * @example
     * // Create one ProjectMemory
     * const ProjectMemory = await prisma.projectMemory.create({
     *   data: {
     *     // ... data to create a ProjectMemory
     *   }
     * })
     * 
     */
    create<T extends ProjectMemoryCreateArgs>(args: SelectSubset<T, ProjectMemoryCreateArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMemories.
     * @param {ProjectMemoryCreateManyArgs} args - Arguments to create many ProjectMemories.
     * @example
     * // Create many ProjectMemories
     * const projectMemory = await prisma.projectMemory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMemoryCreateManyArgs>(args?: SelectSubset<T, ProjectMemoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMemories and returns the data saved in the database.
     * @param {ProjectMemoryCreateManyAndReturnArgs} args - Arguments to create many ProjectMemories.
     * @example
     * // Create many ProjectMemories
     * const projectMemory = await prisma.projectMemory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMemories and only return the `id`
     * const projectMemoryWithIdOnly = await prisma.projectMemory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMemoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMemoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMemory.
     * @param {ProjectMemoryDeleteArgs} args - Arguments to delete one ProjectMemory.
     * @example
     * // Delete one ProjectMemory
     * const ProjectMemory = await prisma.projectMemory.delete({
     *   where: {
     *     // ... filter to delete one ProjectMemory
     *   }
     * })
     * 
     */
    delete<T extends ProjectMemoryDeleteArgs>(args: SelectSubset<T, ProjectMemoryDeleteArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMemory.
     * @param {ProjectMemoryUpdateArgs} args - Arguments to update one ProjectMemory.
     * @example
     * // Update one ProjectMemory
     * const projectMemory = await prisma.projectMemory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMemoryUpdateArgs>(args: SelectSubset<T, ProjectMemoryUpdateArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMemories.
     * @param {ProjectMemoryDeleteManyArgs} args - Arguments to filter ProjectMemories to delete.
     * @example
     * // Delete a few ProjectMemories
     * const { count } = await prisma.projectMemory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMemoryDeleteManyArgs>(args?: SelectSubset<T, ProjectMemoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMemories
     * const projectMemory = await prisma.projectMemory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMemoryUpdateManyArgs>(args: SelectSubset<T, ProjectMemoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMemories and returns the data updated in the database.
     * @param {ProjectMemoryUpdateManyAndReturnArgs} args - Arguments to update many ProjectMemories.
     * @example
     * // Update many ProjectMemories
     * const projectMemory = await prisma.projectMemory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMemories and only return the `id`
     * const projectMemoryWithIdOnly = await prisma.projectMemory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMemoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMemoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMemory.
     * @param {ProjectMemoryUpsertArgs} args - Arguments to update or create a ProjectMemory.
     * @example
     * // Update or create a ProjectMemory
     * const projectMemory = await prisma.projectMemory.upsert({
     *   create: {
     *     // ... data to create a ProjectMemory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMemory we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMemoryUpsertArgs>(args: SelectSubset<T, ProjectMemoryUpsertArgs<ExtArgs>>): Prisma__ProjectMemoryClient<$Result.GetResult<Prisma.$ProjectMemoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryCountArgs} args - Arguments to filter ProjectMemories to count.
     * @example
     * // Count the number of ProjectMemories
     * const count = await prisma.projectMemory.count({
     *   where: {
     *     // ... the filter for the ProjectMemories we want to count
     *   }
     * })
    **/
    count<T extends ProjectMemoryCountArgs>(
      args?: Subset<T, ProjectMemoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMemoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectMemoryAggregateArgs>(args: Subset<T, ProjectMemoryAggregateArgs>): Prisma.PrismaPromise<GetProjectMemoryAggregateType<T>>

    /**
     * Group by ProjectMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectMemoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMemoryGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMemoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectMemoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMemoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMemory model
   */
  readonly fields: ProjectMemoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMemory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMemoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectMemory model
   */
  interface ProjectMemoryFieldRefs {
    readonly id: FieldRef<"ProjectMemory", 'String'>
    readonly projectId: FieldRef<"ProjectMemory", 'String'>
    readonly summary: FieldRef<"ProjectMemory", 'String'>
    readonly facts: FieldRef<"ProjectMemory", 'Json'>
    readonly decisions: FieldRef<"ProjectMemory", 'Json'>
    readonly openQuestions: FieldRef<"ProjectMemory", 'Json'>
    readonly updatedAt: FieldRef<"ProjectMemory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMemory findUnique
   */
  export type ProjectMemoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemory to fetch.
     */
    where: ProjectMemoryWhereUniqueInput
  }

  /**
   * ProjectMemory findUniqueOrThrow
   */
  export type ProjectMemoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemory to fetch.
     */
    where: ProjectMemoryWhereUniqueInput
  }

  /**
   * ProjectMemory findFirst
   */
  export type ProjectMemoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemory to fetch.
     */
    where?: ProjectMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemories to fetch.
     */
    orderBy?: ProjectMemoryOrderByWithRelationInput | ProjectMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMemories.
     */
    cursor?: ProjectMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMemories.
     */
    distinct?: ProjectMemoryScalarFieldEnum | ProjectMemoryScalarFieldEnum[]
  }

  /**
   * ProjectMemory findFirstOrThrow
   */
  export type ProjectMemoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemory to fetch.
     */
    where?: ProjectMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemories to fetch.
     */
    orderBy?: ProjectMemoryOrderByWithRelationInput | ProjectMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMemories.
     */
    cursor?: ProjectMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMemories.
     */
    distinct?: ProjectMemoryScalarFieldEnum | ProjectMemoryScalarFieldEnum[]
  }

  /**
   * ProjectMemory findMany
   */
  export type ProjectMemoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemories to fetch.
     */
    where?: ProjectMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemories to fetch.
     */
    orderBy?: ProjectMemoryOrderByWithRelationInput | ProjectMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMemories.
     */
    cursor?: ProjectMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemories.
     */
    skip?: number
    distinct?: ProjectMemoryScalarFieldEnum | ProjectMemoryScalarFieldEnum[]
  }

  /**
   * ProjectMemory create
   */
  export type ProjectMemoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMemory.
     */
    data: XOR<ProjectMemoryCreateInput, ProjectMemoryUncheckedCreateInput>
  }

  /**
   * ProjectMemory createMany
   */
  export type ProjectMemoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMemories.
     */
    data: ProjectMemoryCreateManyInput | ProjectMemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMemory createManyAndReturn
   */
  export type ProjectMemoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMemories.
     */
    data: ProjectMemoryCreateManyInput | ProjectMemoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMemory update
   */
  export type ProjectMemoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMemory.
     */
    data: XOR<ProjectMemoryUpdateInput, ProjectMemoryUncheckedUpdateInput>
    /**
     * Choose, which ProjectMemory to update.
     */
    where: ProjectMemoryWhereUniqueInput
  }

  /**
   * ProjectMemory updateMany
   */
  export type ProjectMemoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMemories.
     */
    data: XOR<ProjectMemoryUpdateManyMutationInput, ProjectMemoryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMemories to update
     */
    where?: ProjectMemoryWhereInput
    /**
     * Limit how many ProjectMemories to update.
     */
    limit?: number
  }

  /**
   * ProjectMemory updateManyAndReturn
   */
  export type ProjectMemoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMemories.
     */
    data: XOR<ProjectMemoryUpdateManyMutationInput, ProjectMemoryUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMemories to update
     */
    where?: ProjectMemoryWhereInput
    /**
     * Limit how many ProjectMemories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMemory upsert
   */
  export type ProjectMemoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMemory to update in case it exists.
     */
    where: ProjectMemoryWhereUniqueInput
    /**
     * In case the ProjectMemory found by the `where` argument doesn't exist, create a new ProjectMemory with this data.
     */
    create: XOR<ProjectMemoryCreateInput, ProjectMemoryUncheckedCreateInput>
    /**
     * In case the ProjectMemory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMemoryUpdateInput, ProjectMemoryUncheckedUpdateInput>
  }

  /**
   * ProjectMemory delete
   */
  export type ProjectMemoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
    /**
     * Filter which ProjectMemory to delete.
     */
    where: ProjectMemoryWhereUniqueInput
  }

  /**
   * ProjectMemory deleteMany
   */
  export type ProjectMemoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMemories to delete
     */
    where?: ProjectMemoryWhereInput
    /**
     * Limit how many ProjectMemories to delete.
     */
    limit?: number
  }

  /**
   * ProjectMemory without action
   */
  export type ProjectMemoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMemory
     */
    select?: ProjectMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMemory
     */
    omit?: ProjectMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemoryInclude<ExtArgs> | null
  }


  /**
   * Model Thread
   */

  export type AggregateThread = {
    _count: ThreadCountAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  export type ThreadMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    title: string | null
    mode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThreadMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    title: string | null
    mode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ThreadCountAggregateOutputType = {
    id: number
    projectId: number
    title: number
    mode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ThreadMinAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    mode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThreadMaxAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    mode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ThreadCountAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    mode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ThreadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Thread to aggregate.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Threads
    **/
    _count?: true | ThreadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThreadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThreadMaxAggregateInputType
  }

  export type GetThreadAggregateType<T extends ThreadAggregateArgs> = {
        [P in keyof T & keyof AggregateThread]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThread[P]>
      : GetScalarType<T[P], AggregateThread[P]>
  }




  export type ThreadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThreadWhereInput
    orderBy?: ThreadOrderByWithAggregationInput | ThreadOrderByWithAggregationInput[]
    by: ThreadScalarFieldEnum[] | ThreadScalarFieldEnum
    having?: ThreadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThreadCountAggregateInputType | true
    _min?: ThreadMinAggregateInputType
    _max?: ThreadMaxAggregateInputType
  }

  export type ThreadGroupByOutputType = {
    id: string
    projectId: string
    title: string
    mode: string
    createdAt: Date
    updatedAt: Date
    _count: ThreadCountAggregateOutputType | null
    _min: ThreadMinAggregateOutputType | null
    _max: ThreadMaxAggregateOutputType | null
  }

  type GetThreadGroupByPayload<T extends ThreadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThreadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThreadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThreadGroupByOutputType[P]>
            : GetScalarType<T[P], ThreadGroupByOutputType[P]>
        }
      >
    >


  export type ThreadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    mode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    messages?: boolean | Thread$messagesArgs<ExtArgs>
    _count?: boolean | ThreadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    mode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    mode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["thread"]>

  export type ThreadSelectScalar = {
    id?: boolean
    projectId?: boolean
    title?: boolean
    mode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ThreadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "title" | "mode" | "createdAt" | "updatedAt", ExtArgs["result"]["thread"]>
  export type ThreadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    messages?: boolean | Thread$messagesArgs<ExtArgs>
    _count?: boolean | ThreadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ThreadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ThreadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ThreadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Thread"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      title: string
      mode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["thread"]>
    composites: {}
  }

  type ThreadGetPayload<S extends boolean | null | undefined | ThreadDefaultArgs> = $Result.GetResult<Prisma.$ThreadPayload, S>

  type ThreadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThreadCountAggregateInputType | true
    }

  export interface ThreadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Thread'], meta: { name: 'Thread' } }
    /**
     * Find zero or one Thread that matches the filter.
     * @param {ThreadFindUniqueArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThreadFindUniqueArgs>(args: SelectSubset<T, ThreadFindUniqueArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Thread that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThreadFindUniqueOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThreadFindUniqueOrThrowArgs>(args: SelectSubset<T, ThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThreadFindFirstArgs>(args?: SelectSubset<T, ThreadFindFirstArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Thread that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindFirstOrThrowArgs} args - Arguments to find a Thread
     * @example
     * // Get one Thread
     * const thread = await prisma.thread.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThreadFindFirstOrThrowArgs>(args?: SelectSubset<T, ThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Threads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Threads
     * const threads = await prisma.thread.findMany()
     * 
     * // Get first 10 Threads
     * const threads = await prisma.thread.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const threadWithIdOnly = await prisma.thread.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThreadFindManyArgs>(args?: SelectSubset<T, ThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Thread.
     * @param {ThreadCreateArgs} args - Arguments to create a Thread.
     * @example
     * // Create one Thread
     * const Thread = await prisma.thread.create({
     *   data: {
     *     // ... data to create a Thread
     *   }
     * })
     * 
     */
    create<T extends ThreadCreateArgs>(args: SelectSubset<T, ThreadCreateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Threads.
     * @param {ThreadCreateManyArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThreadCreateManyArgs>(args?: SelectSubset<T, ThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Threads and returns the data saved in the database.
     * @param {ThreadCreateManyAndReturnArgs} args - Arguments to create many Threads.
     * @example
     * // Create many Threads
     * const thread = await prisma.thread.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThreadCreateManyAndReturnArgs>(args?: SelectSubset<T, ThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Thread.
     * @param {ThreadDeleteArgs} args - Arguments to delete one Thread.
     * @example
     * // Delete one Thread
     * const Thread = await prisma.thread.delete({
     *   where: {
     *     // ... filter to delete one Thread
     *   }
     * })
     * 
     */
    delete<T extends ThreadDeleteArgs>(args: SelectSubset<T, ThreadDeleteArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Thread.
     * @param {ThreadUpdateArgs} args - Arguments to update one Thread.
     * @example
     * // Update one Thread
     * const thread = await prisma.thread.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThreadUpdateArgs>(args: SelectSubset<T, ThreadUpdateArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Threads.
     * @param {ThreadDeleteManyArgs} args - Arguments to filter Threads to delete.
     * @example
     * // Delete a few Threads
     * const { count } = await prisma.thread.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThreadDeleteManyArgs>(args?: SelectSubset<T, ThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThreadUpdateManyArgs>(args: SelectSubset<T, ThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Threads and returns the data updated in the database.
     * @param {ThreadUpdateManyAndReturnArgs} args - Arguments to update many Threads.
     * @example
     * // Update many Threads
     * const thread = await prisma.thread.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Threads and only return the `id`
     * const threadWithIdOnly = await prisma.thread.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThreadUpdateManyAndReturnArgs>(args: SelectSubset<T, ThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Thread.
     * @param {ThreadUpsertArgs} args - Arguments to update or create a Thread.
     * @example
     * // Update or create a Thread
     * const thread = await prisma.thread.upsert({
     *   create: {
     *     // ... data to create a Thread
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Thread we want to update
     *   }
     * })
     */
    upsert<T extends ThreadUpsertArgs>(args: SelectSubset<T, ThreadUpsertArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Threads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadCountArgs} args - Arguments to filter Threads to count.
     * @example
     * // Count the number of Threads
     * const count = await prisma.thread.count({
     *   where: {
     *     // ... the filter for the Threads we want to count
     *   }
     * })
    **/
    count<T extends ThreadCountArgs>(
      args?: Subset<T, ThreadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThreadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThreadAggregateArgs>(args: Subset<T, ThreadAggregateArgs>): Prisma.PrismaPromise<GetThreadAggregateType<T>>

    /**
     * Group by Thread.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThreadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThreadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThreadGroupByArgs['orderBy'] }
        : { orderBy?: ThreadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Thread model
   */
  readonly fields: ThreadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Thread.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThreadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Thread$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Thread$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Thread model
   */
  interface ThreadFieldRefs {
    readonly id: FieldRef<"Thread", 'String'>
    readonly projectId: FieldRef<"Thread", 'String'>
    readonly title: FieldRef<"Thread", 'String'>
    readonly mode: FieldRef<"Thread", 'String'>
    readonly createdAt: FieldRef<"Thread", 'DateTime'>
    readonly updatedAt: FieldRef<"Thread", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Thread findUnique
   */
  export type ThreadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findUniqueOrThrow
   */
  export type ThreadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread findFirst
   */
  export type ThreadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findFirstOrThrow
   */
  export type ThreadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Thread to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Threads.
     */
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread findMany
   */
  export type ThreadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter, which Threads to fetch.
     */
    where?: ThreadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Threads to fetch.
     */
    orderBy?: ThreadOrderByWithRelationInput | ThreadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Threads.
     */
    cursor?: ThreadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Threads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Threads.
     */
    skip?: number
    distinct?: ThreadScalarFieldEnum | ThreadScalarFieldEnum[]
  }

  /**
   * Thread create
   */
  export type ThreadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The data needed to create a Thread.
     */
    data: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
  }

  /**
   * Thread createMany
   */
  export type ThreadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Thread createManyAndReturn
   */
  export type ThreadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to create many Threads.
     */
    data: ThreadCreateManyInput | ThreadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Thread update
   */
  export type ThreadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The data needed to update a Thread.
     */
    data: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
    /**
     * Choose, which Thread to update.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread updateMany
   */
  export type ThreadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
  }

  /**
   * Thread updateManyAndReturn
   */
  export type ThreadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * The data used to update Threads.
     */
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyInput>
    /**
     * Filter which Threads to update
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Thread upsert
   */
  export type ThreadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * The filter to search for the Thread to update in case it exists.
     */
    where: ThreadWhereUniqueInput
    /**
     * In case the Thread found by the `where` argument doesn't exist, create a new Thread with this data.
     */
    create: XOR<ThreadCreateInput, ThreadUncheckedCreateInput>
    /**
     * In case the Thread was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThreadUpdateInput, ThreadUncheckedUpdateInput>
  }

  /**
   * Thread delete
   */
  export type ThreadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
    /**
     * Filter which Thread to delete.
     */
    where: ThreadWhereUniqueInput
  }

  /**
   * Thread deleteMany
   */
  export type ThreadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Threads to delete
     */
    where?: ThreadWhereInput
    /**
     * Limit how many Threads to delete.
     */
    limit?: number
  }

  /**
   * Thread.messages
   */
  export type Thread$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Thread without action
   */
  export type ThreadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Thread
     */
    select?: ThreadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Thread
     */
    omit?: ThreadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThreadInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    turnNumber: number | null
  }

  export type MessageSumAggregateOutputType = {
    turnNumber: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    threadId: string | null
    projectId: string | null
    role: string | null
    content: string | null
    modelUsed: string | null
    turnNumber: number | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    threadId: string | null
    projectId: string | null
    role: string | null
    content: string | null
    modelUsed: string | null
    turnNumber: number | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    threadId: number
    projectId: number
    role: number
    content: number
    modelUsed: number
    turnNumber: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    turnNumber?: true
  }

  export type MessageSumAggregateInputType = {
    turnNumber?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    threadId?: true
    projectId?: true
    role?: true
    content?: true
    modelUsed?: true
    turnNumber?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    threadId?: true
    projectId?: true
    role?: true
    content?: true
    modelUsed?: true
    turnNumber?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    threadId?: true
    projectId?: true
    role?: true
    content?: true
    modelUsed?: true
    turnNumber?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    threadId: string
    projectId: string
    role: string
    content: string
    modelUsed: string | null
    turnNumber: number
    metadata: JsonValue | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    projectId?: boolean
    role?: boolean
    content?: boolean
    modelUsed?: boolean
    turnNumber?: boolean
    metadata?: boolean
    createdAt?: boolean
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    projectId?: boolean
    role?: boolean
    content?: boolean
    modelUsed?: boolean
    turnNumber?: boolean
    metadata?: boolean
    createdAt?: boolean
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    projectId?: boolean
    role?: boolean
    content?: boolean
    modelUsed?: boolean
    turnNumber?: boolean
    metadata?: boolean
    createdAt?: boolean
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    threadId?: boolean
    projectId?: boolean
    role?: boolean
    content?: boolean
    modelUsed?: boolean
    turnNumber?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "projectId" | "role" | "content" | "modelUsed" | "turnNumber" | "metadata" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thread?: boolean | ThreadDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      thread: Prisma.$ThreadPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      threadId: string
      projectId: string
      role: string
      content: string
      modelUsed: string | null
      turnNumber: number
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    thread<T extends ThreadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ThreadDefaultArgs<ExtArgs>>): Prisma__ThreadClient<$Result.GetResult<Prisma.$ThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly threadId: FieldRef<"Message", 'String'>
    readonly projectId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly modelUsed: FieldRef<"Message", 'String'>
    readonly turnNumber: FieldRef<"Message", 'Int'>
    readonly metadata: FieldRef<"Message", 'Json'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model UserWallet
   */

  export type AggregateUserWallet = {
    _count: UserWalletCountAggregateOutputType | null
    _avg: UserWalletAvgAggregateOutputType | null
    _sum: UserWalletSumAggregateOutputType | null
    _min: UserWalletMinAggregateOutputType | null
    _max: UserWalletMaxAggregateOutputType | null
  }

  export type UserWalletAvgAggregateOutputType = {
    balanceMicrocredits: number | null
    capMicrocredits: number | null
  }

  export type UserWalletSumAggregateOutputType = {
    balanceMicrocredits: bigint | null
    capMicrocredits: bigint | null
  }

  export type UserWalletMinAggregateOutputType = {
    userId: string | null
    balanceMicrocredits: bigint | null
    subscriptionStatus: string | null
    currentPeriodEnd: Date | null
    capMicrocredits: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserWalletMaxAggregateOutputType = {
    userId: string | null
    balanceMicrocredits: bigint | null
    subscriptionStatus: string | null
    currentPeriodEnd: Date | null
    capMicrocredits: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserWalletCountAggregateOutputType = {
    userId: number
    balanceMicrocredits: number
    subscriptionStatus: number
    currentPeriodEnd: number
    capMicrocredits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserWalletAvgAggregateInputType = {
    balanceMicrocredits?: true
    capMicrocredits?: true
  }

  export type UserWalletSumAggregateInputType = {
    balanceMicrocredits?: true
    capMicrocredits?: true
  }

  export type UserWalletMinAggregateInputType = {
    userId?: true
    balanceMicrocredits?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    capMicrocredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserWalletMaxAggregateInputType = {
    userId?: true
    balanceMicrocredits?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    capMicrocredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserWalletCountAggregateInputType = {
    userId?: true
    balanceMicrocredits?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    capMicrocredits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserWalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWallet to aggregate.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWallets
    **/
    _count?: true | UserWalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserWalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserWalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWalletMaxAggregateInputType
  }

  export type GetUserWalletAggregateType<T extends UserWalletAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWallet[P]>
      : GetScalarType<T[P], AggregateUserWallet[P]>
  }




  export type UserWalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWalletWhereInput
    orderBy?: UserWalletOrderByWithAggregationInput | UserWalletOrderByWithAggregationInput[]
    by: UserWalletScalarFieldEnum[] | UserWalletScalarFieldEnum
    having?: UserWalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWalletCountAggregateInputType | true
    _avg?: UserWalletAvgAggregateInputType
    _sum?: UserWalletSumAggregateInputType
    _min?: UserWalletMinAggregateInputType
    _max?: UserWalletMaxAggregateInputType
  }

  export type UserWalletGroupByOutputType = {
    userId: string
    balanceMicrocredits: bigint
    subscriptionStatus: string
    currentPeriodEnd: Date | null
    capMicrocredits: bigint
    createdAt: Date
    updatedAt: Date
    _count: UserWalletCountAggregateOutputType | null
    _avg: UserWalletAvgAggregateOutputType | null
    _sum: UserWalletSumAggregateOutputType | null
    _min: UserWalletMinAggregateOutputType | null
    _max: UserWalletMaxAggregateOutputType | null
  }

  type GetUserWalletGroupByPayload<T extends UserWalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWalletGroupByOutputType[P]>
            : GetScalarType<T[P], UserWalletGroupByOutputType[P]>
        }
      >
    >


  export type UserWalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balanceMicrocredits?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    capMicrocredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subscriptionPayments?: boolean | UserWallet$subscriptionPaymentsArgs<ExtArgs>
    creditUsage?: boolean | UserWallet$creditUsageArgs<ExtArgs>
    _count?: boolean | UserWalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWallet"]>

  export type UserWalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balanceMicrocredits?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    capMicrocredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWallet"]>

  export type UserWalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balanceMicrocredits?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    capMicrocredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWallet"]>

  export type UserWalletSelectScalar = {
    userId?: boolean
    balanceMicrocredits?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    capMicrocredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserWalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "balanceMicrocredits" | "subscriptionStatus" | "currentPeriodEnd" | "capMicrocredits" | "createdAt" | "updatedAt", ExtArgs["result"]["userWallet"]>
  export type UserWalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subscriptionPayments?: boolean | UserWallet$subscriptionPaymentsArgs<ExtArgs>
    creditUsage?: boolean | UserWallet$creditUsageArgs<ExtArgs>
    _count?: boolean | UserWalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserWalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserWalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserWalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      subscriptionPayments: Prisma.$SubscriptionPaymentPayload<ExtArgs>[]
      creditUsage: Prisma.$CreditUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      balanceMicrocredits: bigint
      subscriptionStatus: string
      currentPeriodEnd: Date | null
      capMicrocredits: bigint
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userWallet"]>
    composites: {}
  }

  type UserWalletGetPayload<S extends boolean | null | undefined | UserWalletDefaultArgs> = $Result.GetResult<Prisma.$UserWalletPayload, S>

  type UserWalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserWalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserWalletCountAggregateInputType | true
    }

  export interface UserWalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWallet'], meta: { name: 'UserWallet' } }
    /**
     * Find zero or one UserWallet that matches the filter.
     * @param {UserWalletFindUniqueArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWalletFindUniqueArgs>(args: SelectSubset<T, UserWalletFindUniqueArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserWallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserWalletFindUniqueOrThrowArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWalletFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindFirstArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWalletFindFirstArgs>(args?: SelectSubset<T, UserWalletFindFirstArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindFirstOrThrowArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWalletFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWallets
     * const userWallets = await prisma.userWallet.findMany()
     * 
     * // Get first 10 UserWallets
     * const userWallets = await prisma.userWallet.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWalletWithUserIdOnly = await prisma.userWallet.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserWalletFindManyArgs>(args?: SelectSubset<T, UserWalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserWallet.
     * @param {UserWalletCreateArgs} args - Arguments to create a UserWallet.
     * @example
     * // Create one UserWallet
     * const UserWallet = await prisma.userWallet.create({
     *   data: {
     *     // ... data to create a UserWallet
     *   }
     * })
     * 
     */
    create<T extends UserWalletCreateArgs>(args: SelectSubset<T, UserWalletCreateArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserWallets.
     * @param {UserWalletCreateManyArgs} args - Arguments to create many UserWallets.
     * @example
     * // Create many UserWallets
     * const userWallet = await prisma.userWallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWalletCreateManyArgs>(args?: SelectSubset<T, UserWalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWallets and returns the data saved in the database.
     * @param {UserWalletCreateManyAndReturnArgs} args - Arguments to create many UserWallets.
     * @example
     * // Create many UserWallets
     * const userWallet = await prisma.userWallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWallets and only return the `userId`
     * const userWalletWithUserIdOnly = await prisma.userWallet.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWalletCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserWallet.
     * @param {UserWalletDeleteArgs} args - Arguments to delete one UserWallet.
     * @example
     * // Delete one UserWallet
     * const UserWallet = await prisma.userWallet.delete({
     *   where: {
     *     // ... filter to delete one UserWallet
     *   }
     * })
     * 
     */
    delete<T extends UserWalletDeleteArgs>(args: SelectSubset<T, UserWalletDeleteArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserWallet.
     * @param {UserWalletUpdateArgs} args - Arguments to update one UserWallet.
     * @example
     * // Update one UserWallet
     * const userWallet = await prisma.userWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWalletUpdateArgs>(args: SelectSubset<T, UserWalletUpdateArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserWallets.
     * @param {UserWalletDeleteManyArgs} args - Arguments to filter UserWallets to delete.
     * @example
     * // Delete a few UserWallets
     * const { count } = await prisma.userWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWalletDeleteManyArgs>(args?: SelectSubset<T, UserWalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWallets
     * const userWallet = await prisma.userWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWalletUpdateManyArgs>(args: SelectSubset<T, UserWalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWallets and returns the data updated in the database.
     * @param {UserWalletUpdateManyAndReturnArgs} args - Arguments to update many UserWallets.
     * @example
     * // Update many UserWallets
     * const userWallet = await prisma.userWallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserWallets and only return the `userId`
     * const userWalletWithUserIdOnly = await prisma.userWallet.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserWalletUpdateManyAndReturnArgs>(args: SelectSubset<T, UserWalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserWallet.
     * @param {UserWalletUpsertArgs} args - Arguments to update or create a UserWallet.
     * @example
     * // Update or create a UserWallet
     * const userWallet = await prisma.userWallet.upsert({
     *   create: {
     *     // ... data to create a UserWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWallet we want to update
     *   }
     * })
     */
    upsert<T extends UserWalletUpsertArgs>(args: SelectSubset<T, UserWalletUpsertArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletCountArgs} args - Arguments to filter UserWallets to count.
     * @example
     * // Count the number of UserWallets
     * const count = await prisma.userWallet.count({
     *   where: {
     *     // ... the filter for the UserWallets we want to count
     *   }
     * })
    **/
    count<T extends UserWalletCountArgs>(
      args?: Subset<T, UserWalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserWalletAggregateArgs>(args: Subset<T, UserWalletAggregateArgs>): Prisma.PrismaPromise<GetUserWalletAggregateType<T>>

    /**
     * Group by UserWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserWalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWalletGroupByArgs['orderBy'] }
        : { orderBy?: UserWalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWallet model
   */
  readonly fields: UserWalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscriptionPayments<T extends UserWallet$subscriptionPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, UserWallet$subscriptionPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditUsage<T extends UserWallet$creditUsageArgs<ExtArgs> = {}>(args?: Subset<T, UserWallet$creditUsageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserWallet model
   */
  interface UserWalletFieldRefs {
    readonly userId: FieldRef<"UserWallet", 'String'>
    readonly balanceMicrocredits: FieldRef<"UserWallet", 'BigInt'>
    readonly subscriptionStatus: FieldRef<"UserWallet", 'String'>
    readonly currentPeriodEnd: FieldRef<"UserWallet", 'DateTime'>
    readonly capMicrocredits: FieldRef<"UserWallet", 'BigInt'>
    readonly createdAt: FieldRef<"UserWallet", 'DateTime'>
    readonly updatedAt: FieldRef<"UserWallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserWallet findUnique
   */
  export type UserWalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where: UserWalletWhereUniqueInput
  }

  /**
   * UserWallet findUniqueOrThrow
   */
  export type UserWalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where: UserWalletWhereUniqueInput
  }

  /**
   * UserWallet findFirst
   */
  export type UserWalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWallets.
     */
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }

  /**
   * UserWallet findFirstOrThrow
   */
  export type UserWalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWallets.
     */
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }

  /**
   * UserWallet findMany
   */
  export type UserWalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallets to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }

  /**
   * UserWallet create
   */
  export type UserWalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWallet.
     */
    data: XOR<UserWalletCreateInput, UserWalletUncheckedCreateInput>
  }

  /**
   * UserWallet createMany
   */
  export type UserWalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWallets.
     */
    data: UserWalletCreateManyInput | UserWalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserWallet createManyAndReturn
   */
  export type UserWalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * The data used to create many UserWallets.
     */
    data: UserWalletCreateManyInput | UserWalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWallet update
   */
  export type UserWalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWallet.
     */
    data: XOR<UserWalletUpdateInput, UserWalletUncheckedUpdateInput>
    /**
     * Choose, which UserWallet to update.
     */
    where: UserWalletWhereUniqueInput
  }

  /**
   * UserWallet updateMany
   */
  export type UserWalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWallets.
     */
    data: XOR<UserWalletUpdateManyMutationInput, UserWalletUncheckedUpdateManyInput>
    /**
     * Filter which UserWallets to update
     */
    where?: UserWalletWhereInput
    /**
     * Limit how many UserWallets to update.
     */
    limit?: number
  }

  /**
   * UserWallet updateManyAndReturn
   */
  export type UserWalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * The data used to update UserWallets.
     */
    data: XOR<UserWalletUpdateManyMutationInput, UserWalletUncheckedUpdateManyInput>
    /**
     * Filter which UserWallets to update
     */
    where?: UserWalletWhereInput
    /**
     * Limit how many UserWallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWallet upsert
   */
  export type UserWalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWallet to update in case it exists.
     */
    where: UserWalletWhereUniqueInput
    /**
     * In case the UserWallet found by the `where` argument doesn't exist, create a new UserWallet with this data.
     */
    create: XOR<UserWalletCreateInput, UserWalletUncheckedCreateInput>
    /**
     * In case the UserWallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWalletUpdateInput, UserWalletUncheckedUpdateInput>
  }

  /**
   * UserWallet delete
   */
  export type UserWalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter which UserWallet to delete.
     */
    where: UserWalletWhereUniqueInput
  }

  /**
   * UserWallet deleteMany
   */
  export type UserWalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWallets to delete
     */
    where?: UserWalletWhereInput
    /**
     * Limit how many UserWallets to delete.
     */
    limit?: number
  }

  /**
   * UserWallet.subscriptionPayments
   */
  export type UserWallet$subscriptionPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    where?: SubscriptionPaymentWhereInput
    orderBy?: SubscriptionPaymentOrderByWithRelationInput | SubscriptionPaymentOrderByWithRelationInput[]
    cursor?: SubscriptionPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionPaymentScalarFieldEnum | SubscriptionPaymentScalarFieldEnum[]
  }

  /**
   * UserWallet.creditUsage
   */
  export type UserWallet$creditUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    where?: CreditUsageWhereInput
    orderBy?: CreditUsageOrderByWithRelationInput | CreditUsageOrderByWithRelationInput[]
    cursor?: CreditUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditUsageScalarFieldEnum | CreditUsageScalarFieldEnum[]
  }

  /**
   * UserWallet without action
   */
  export type UserWalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWallet
     */
    omit?: UserWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWalletInclude<ExtArgs> | null
  }


  /**
   * Model SubscriptionPayment
   */

  export type AggregateSubscriptionPayment = {
    _count: SubscriptionPaymentCountAggregateOutputType | null
    _avg: SubscriptionPaymentAvgAggregateOutputType | null
    _sum: SubscriptionPaymentSumAggregateOutputType | null
    _min: SubscriptionPaymentMinAggregateOutputType | null
    _max: SubscriptionPaymentMaxAggregateOutputType | null
  }

  export type SubscriptionPaymentAvgAggregateOutputType = {
    amountPaidCents: number | null
    grantMicrocredits: number | null
    balanceBeforeMicrocredits: number | null
    balanceAfterMicrocredits: number | null
  }

  export type SubscriptionPaymentSumAggregateOutputType = {
    amountPaidCents: number | null
    grantMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
  }

  export type SubscriptionPaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    paymentProvider: string | null
    paymentProviderId: string | null
    amountPaidCents: number | null
    currency: string | null
    grantMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
    createdAt: Date | null
  }

  export type SubscriptionPaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    paymentProvider: string | null
    paymentProviderId: string | null
    amountPaidCents: number | null
    currency: string | null
    grantMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
    createdAt: Date | null
  }

  export type SubscriptionPaymentCountAggregateOutputType = {
    id: number
    userId: number
    paymentProvider: number
    paymentProviderId: number
    amountPaidCents: number
    currency: number
    grantMicrocredits: number
    balanceBeforeMicrocredits: number
    balanceAfterMicrocredits: number
    createdAt: number
    _all: number
  }


  export type SubscriptionPaymentAvgAggregateInputType = {
    amountPaidCents?: true
    grantMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
  }

  export type SubscriptionPaymentSumAggregateInputType = {
    amountPaidCents?: true
    grantMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
  }

  export type SubscriptionPaymentMinAggregateInputType = {
    id?: true
    userId?: true
    paymentProvider?: true
    paymentProviderId?: true
    amountPaidCents?: true
    currency?: true
    grantMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
  }

  export type SubscriptionPaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    paymentProvider?: true
    paymentProviderId?: true
    amountPaidCents?: true
    currency?: true
    grantMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
  }

  export type SubscriptionPaymentCountAggregateInputType = {
    id?: true
    userId?: true
    paymentProvider?: true
    paymentProviderId?: true
    amountPaidCents?: true
    currency?: true
    grantMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
    _all?: true
  }

  export type SubscriptionPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPayment to aggregate.
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPayments to fetch.
     */
    orderBy?: SubscriptionPaymentOrderByWithRelationInput | SubscriptionPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionPayments
    **/
    _count?: true | SubscriptionPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionPaymentMaxAggregateInputType
  }

  export type GetSubscriptionPaymentAggregateType<T extends SubscriptionPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionPayment[P]>
      : GetScalarType<T[P], AggregateSubscriptionPayment[P]>
  }




  export type SubscriptionPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionPaymentWhereInput
    orderBy?: SubscriptionPaymentOrderByWithAggregationInput | SubscriptionPaymentOrderByWithAggregationInput[]
    by: SubscriptionPaymentScalarFieldEnum[] | SubscriptionPaymentScalarFieldEnum
    having?: SubscriptionPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionPaymentCountAggregateInputType | true
    _avg?: SubscriptionPaymentAvgAggregateInputType
    _sum?: SubscriptionPaymentSumAggregateInputType
    _min?: SubscriptionPaymentMinAggregateInputType
    _max?: SubscriptionPaymentMaxAggregateInputType
  }

  export type SubscriptionPaymentGroupByOutputType = {
    id: string
    userId: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency: string
    grantMicrocredits: bigint
    balanceBeforeMicrocredits: bigint
    balanceAfterMicrocredits: bigint
    createdAt: Date
    _count: SubscriptionPaymentCountAggregateOutputType | null
    _avg: SubscriptionPaymentAvgAggregateOutputType | null
    _sum: SubscriptionPaymentSumAggregateOutputType | null
    _min: SubscriptionPaymentMinAggregateOutputType | null
    _max: SubscriptionPaymentMaxAggregateOutputType | null
  }

  type GetSubscriptionPaymentGroupByPayload<T extends SubscriptionPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionPaymentGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentProvider?: boolean
    paymentProviderId?: boolean
    amountPaidCents?: boolean
    currency?: boolean
    grantMicrocredits?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionPayment"]>

  export type SubscriptionPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentProvider?: boolean
    paymentProviderId?: boolean
    amountPaidCents?: boolean
    currency?: boolean
    grantMicrocredits?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionPayment"]>

  export type SubscriptionPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    paymentProvider?: boolean
    paymentProviderId?: boolean
    amountPaidCents?: boolean
    currency?: boolean
    grantMicrocredits?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionPayment"]>

  export type SubscriptionPaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    paymentProvider?: boolean
    paymentProviderId?: boolean
    amountPaidCents?: boolean
    currency?: boolean
    grantMicrocredits?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
  }

  export type SubscriptionPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "paymentProvider" | "paymentProviderId" | "amountPaidCents" | "currency" | "grantMicrocredits" | "balanceBeforeMicrocredits" | "balanceAfterMicrocredits" | "createdAt", ExtArgs["result"]["subscriptionPayment"]>
  export type SubscriptionPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }
  export type SubscriptionPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }
  export type SubscriptionPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionPayment"
    objects: {
      wallet: Prisma.$UserWalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      paymentProvider: string
      paymentProviderId: string
      amountPaidCents: number
      currency: string
      grantMicrocredits: bigint
      balanceBeforeMicrocredits: bigint
      balanceAfterMicrocredits: bigint
      createdAt: Date
    }, ExtArgs["result"]["subscriptionPayment"]>
    composites: {}
  }

  type SubscriptionPaymentGetPayload<S extends boolean | null | undefined | SubscriptionPaymentDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPaymentPayload, S>

  type SubscriptionPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionPaymentCountAggregateInputType | true
    }

  export interface SubscriptionPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionPayment'], meta: { name: 'SubscriptionPayment' } }
    /**
     * Find zero or one SubscriptionPayment that matches the filter.
     * @param {SubscriptionPaymentFindUniqueArgs} args - Arguments to find a SubscriptionPayment
     * @example
     * // Get one SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionPaymentFindUniqueArgs>(args: SelectSubset<T, SubscriptionPaymentFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriptionPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionPaymentFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionPayment
     * @example
     * // Get one SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentFindFirstArgs} args - Arguments to find a SubscriptionPayment
     * @example
     * // Get one SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionPaymentFindFirstArgs>(args?: SelectSubset<T, SubscriptionPaymentFindFirstArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentFindFirstOrThrowArgs} args - Arguments to find a SubscriptionPayment
     * @example
     * // Get one SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionPayments
     * const subscriptionPayments = await prisma.subscriptionPayment.findMany()
     * 
     * // Get first 10 SubscriptionPayments
     * const subscriptionPayments = await prisma.subscriptionPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionPaymentWithIdOnly = await prisma.subscriptionPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionPaymentFindManyArgs>(args?: SelectSubset<T, SubscriptionPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriptionPayment.
     * @param {SubscriptionPaymentCreateArgs} args - Arguments to create a SubscriptionPayment.
     * @example
     * // Create one SubscriptionPayment
     * const SubscriptionPayment = await prisma.subscriptionPayment.create({
     *   data: {
     *     // ... data to create a SubscriptionPayment
     *   }
     * })
     * 
     */
    create<T extends SubscriptionPaymentCreateArgs>(args: SelectSubset<T, SubscriptionPaymentCreateArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriptionPayments.
     * @param {SubscriptionPaymentCreateManyArgs} args - Arguments to create many SubscriptionPayments.
     * @example
     * // Create many SubscriptionPayments
     * const subscriptionPayment = await prisma.subscriptionPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionPaymentCreateManyArgs>(args?: SelectSubset<T, SubscriptionPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriptionPayments and returns the data saved in the database.
     * @param {SubscriptionPaymentCreateManyAndReturnArgs} args - Arguments to create many SubscriptionPayments.
     * @example
     * // Create many SubscriptionPayments
     * const subscriptionPayment = await prisma.subscriptionPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriptionPayments and only return the `id`
     * const subscriptionPaymentWithIdOnly = await prisma.subscriptionPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscriptionPayment.
     * @param {SubscriptionPaymentDeleteArgs} args - Arguments to delete one SubscriptionPayment.
     * @example
     * // Delete one SubscriptionPayment
     * const SubscriptionPayment = await prisma.subscriptionPayment.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionPayment
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionPaymentDeleteArgs>(args: SelectSubset<T, SubscriptionPaymentDeleteArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriptionPayment.
     * @param {SubscriptionPaymentUpdateArgs} args - Arguments to update one SubscriptionPayment.
     * @example
     * // Update one SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionPaymentUpdateArgs>(args: SelectSubset<T, SubscriptionPaymentUpdateArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriptionPayments.
     * @param {SubscriptionPaymentDeleteManyArgs} args - Arguments to filter SubscriptionPayments to delete.
     * @example
     * // Delete a few SubscriptionPayments
     * const { count } = await prisma.subscriptionPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionPaymentDeleteManyArgs>(args?: SelectSubset<T, SubscriptionPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionPayments
     * const subscriptionPayment = await prisma.subscriptionPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionPaymentUpdateManyArgs>(args: SelectSubset<T, SubscriptionPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionPayments and returns the data updated in the database.
     * @param {SubscriptionPaymentUpdateManyAndReturnArgs} args - Arguments to update many SubscriptionPayments.
     * @example
     * // Update many SubscriptionPayments
     * const subscriptionPayment = await prisma.subscriptionPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscriptionPayments and only return the `id`
     * const subscriptionPaymentWithIdOnly = await prisma.subscriptionPayment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscriptionPayment.
     * @param {SubscriptionPaymentUpsertArgs} args - Arguments to update or create a SubscriptionPayment.
     * @example
     * // Update or create a SubscriptionPayment
     * const subscriptionPayment = await prisma.subscriptionPayment.upsert({
     *   create: {
     *     // ... data to create a SubscriptionPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionPayment we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionPaymentUpsertArgs>(args: SelectSubset<T, SubscriptionPaymentUpsertArgs<ExtArgs>>): Prisma__SubscriptionPaymentClient<$Result.GetResult<Prisma.$SubscriptionPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscriptionPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentCountArgs} args - Arguments to filter SubscriptionPayments to count.
     * @example
     * // Count the number of SubscriptionPayments
     * const count = await prisma.subscriptionPayment.count({
     *   where: {
     *     // ... the filter for the SubscriptionPayments we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionPaymentCountArgs>(
      args?: Subset<T, SubscriptionPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionPaymentAggregateArgs>(args: Subset<T, SubscriptionPaymentAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionPaymentAggregateType<T>>

    /**
     * Group by SubscriptionPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionPaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionPaymentGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionPayment model
   */
  readonly fields: SubscriptionPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends UserWalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserWalletDefaultArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubscriptionPayment model
   */
  interface SubscriptionPaymentFieldRefs {
    readonly id: FieldRef<"SubscriptionPayment", 'String'>
    readonly userId: FieldRef<"SubscriptionPayment", 'String'>
    readonly paymentProvider: FieldRef<"SubscriptionPayment", 'String'>
    readonly paymentProviderId: FieldRef<"SubscriptionPayment", 'String'>
    readonly amountPaidCents: FieldRef<"SubscriptionPayment", 'Int'>
    readonly currency: FieldRef<"SubscriptionPayment", 'String'>
    readonly grantMicrocredits: FieldRef<"SubscriptionPayment", 'BigInt'>
    readonly balanceBeforeMicrocredits: FieldRef<"SubscriptionPayment", 'BigInt'>
    readonly balanceAfterMicrocredits: FieldRef<"SubscriptionPayment", 'BigInt'>
    readonly createdAt: FieldRef<"SubscriptionPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionPayment findUnique
   */
  export type SubscriptionPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPayment to fetch.
     */
    where: SubscriptionPaymentWhereUniqueInput
  }

  /**
   * SubscriptionPayment findUniqueOrThrow
   */
  export type SubscriptionPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPayment to fetch.
     */
    where: SubscriptionPaymentWhereUniqueInput
  }

  /**
   * SubscriptionPayment findFirst
   */
  export type SubscriptionPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPayment to fetch.
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPayments to fetch.
     */
    orderBy?: SubscriptionPaymentOrderByWithRelationInput | SubscriptionPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPayments.
     */
    cursor?: SubscriptionPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPayments.
     */
    distinct?: SubscriptionPaymentScalarFieldEnum | SubscriptionPaymentScalarFieldEnum[]
  }

  /**
   * SubscriptionPayment findFirstOrThrow
   */
  export type SubscriptionPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPayment to fetch.
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPayments to fetch.
     */
    orderBy?: SubscriptionPaymentOrderByWithRelationInput | SubscriptionPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionPayments.
     */
    cursor?: SubscriptionPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionPayments.
     */
    distinct?: SubscriptionPaymentScalarFieldEnum | SubscriptionPaymentScalarFieldEnum[]
  }

  /**
   * SubscriptionPayment findMany
   */
  export type SubscriptionPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionPayments to fetch.
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionPayments to fetch.
     */
    orderBy?: SubscriptionPaymentOrderByWithRelationInput | SubscriptionPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionPayments.
     */
    cursor?: SubscriptionPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionPayments.
     */
    skip?: number
    distinct?: SubscriptionPaymentScalarFieldEnum | SubscriptionPaymentScalarFieldEnum[]
  }

  /**
   * SubscriptionPayment create
   */
  export type SubscriptionPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionPayment.
     */
    data: XOR<SubscriptionPaymentCreateInput, SubscriptionPaymentUncheckedCreateInput>
  }

  /**
   * SubscriptionPayment createMany
   */
  export type SubscriptionPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionPayments.
     */
    data: SubscriptionPaymentCreateManyInput | SubscriptionPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionPayment createManyAndReturn
   */
  export type SubscriptionPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many SubscriptionPayments.
     */
    data: SubscriptionPaymentCreateManyInput | SubscriptionPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionPayment update
   */
  export type SubscriptionPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionPayment.
     */
    data: XOR<SubscriptionPaymentUpdateInput, SubscriptionPaymentUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionPayment to update.
     */
    where: SubscriptionPaymentWhereUniqueInput
  }

  /**
   * SubscriptionPayment updateMany
   */
  export type SubscriptionPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionPayments.
     */
    data: XOR<SubscriptionPaymentUpdateManyMutationInput, SubscriptionPaymentUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionPayments to update
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * Limit how many SubscriptionPayments to update.
     */
    limit?: number
  }

  /**
   * SubscriptionPayment updateManyAndReturn
   */
  export type SubscriptionPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * The data used to update SubscriptionPayments.
     */
    data: XOR<SubscriptionPaymentUpdateManyMutationInput, SubscriptionPaymentUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionPayments to update
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * Limit how many SubscriptionPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionPayment upsert
   */
  export type SubscriptionPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionPayment to update in case it exists.
     */
    where: SubscriptionPaymentWhereUniqueInput
    /**
     * In case the SubscriptionPayment found by the `where` argument doesn't exist, create a new SubscriptionPayment with this data.
     */
    create: XOR<SubscriptionPaymentCreateInput, SubscriptionPaymentUncheckedCreateInput>
    /**
     * In case the SubscriptionPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionPaymentUpdateInput, SubscriptionPaymentUncheckedUpdateInput>
  }

  /**
   * SubscriptionPayment delete
   */
  export type SubscriptionPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionPayment to delete.
     */
    where: SubscriptionPaymentWhereUniqueInput
  }

  /**
   * SubscriptionPayment deleteMany
   */
  export type SubscriptionPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionPayments to delete
     */
    where?: SubscriptionPaymentWhereInput
    /**
     * Limit how many SubscriptionPayments to delete.
     */
    limit?: number
  }

  /**
   * SubscriptionPayment without action
   */
  export type SubscriptionPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPayment
     */
    select?: SubscriptionPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionPayment
     */
    omit?: SubscriptionPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionPaymentInclude<ExtArgs> | null
  }


  /**
   * Model CreditUsage
   */

  export type AggregateCreditUsage = {
    _count: CreditUsageCountAggregateOutputType | null
    _avg: CreditUsageAvgAggregateOutputType | null
    _sum: CreditUsageSumAggregateOutputType | null
    _min: CreditUsageMinAggregateOutputType | null
    _max: CreditUsageMaxAggregateOutputType | null
  }

  export type CreditUsageAvgAggregateOutputType = {
    costMicrousd: number | null
    debitMicrocredits: number | null
    balanceBeforeMicrocredits: number | null
    balanceAfterMicrocredits: number | null
  }

  export type CreditUsageSumAggregateOutputType = {
    costMicrousd: bigint | null
    debitMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
  }

  export type CreditUsageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    requestId: string | null
    openrouterGenerationId: string | null
    modelUsed: string | null
    activityType: string | null
    costMicrousd: bigint | null
    debitMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
    createdAt: Date | null
  }

  export type CreditUsageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    requestId: string | null
    openrouterGenerationId: string | null
    modelUsed: string | null
    activityType: string | null
    costMicrousd: bigint | null
    debitMicrocredits: bigint | null
    balanceBeforeMicrocredits: bigint | null
    balanceAfterMicrocredits: bigint | null
    createdAt: Date | null
  }

  export type CreditUsageCountAggregateOutputType = {
    id: number
    userId: number
    requestId: number
    openrouterGenerationId: number
    modelUsed: number
    activityType: number
    costMicrousd: number
    debitMicrocredits: number
    tokenUsage: number
    balanceBeforeMicrocredits: number
    balanceAfterMicrocredits: number
    createdAt: number
    _all: number
  }


  export type CreditUsageAvgAggregateInputType = {
    costMicrousd?: true
    debitMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
  }

  export type CreditUsageSumAggregateInputType = {
    costMicrousd?: true
    debitMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
  }

  export type CreditUsageMinAggregateInputType = {
    id?: true
    userId?: true
    requestId?: true
    openrouterGenerationId?: true
    modelUsed?: true
    activityType?: true
    costMicrousd?: true
    debitMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
  }

  export type CreditUsageMaxAggregateInputType = {
    id?: true
    userId?: true
    requestId?: true
    openrouterGenerationId?: true
    modelUsed?: true
    activityType?: true
    costMicrousd?: true
    debitMicrocredits?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
  }

  export type CreditUsageCountAggregateInputType = {
    id?: true
    userId?: true
    requestId?: true
    openrouterGenerationId?: true
    modelUsed?: true
    activityType?: true
    costMicrousd?: true
    debitMicrocredits?: true
    tokenUsage?: true
    balanceBeforeMicrocredits?: true
    balanceAfterMicrocredits?: true
    createdAt?: true
    _all?: true
  }

  export type CreditUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditUsage to aggregate.
     */
    where?: CreditUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditUsages to fetch.
     */
    orderBy?: CreditUsageOrderByWithRelationInput | CreditUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditUsages
    **/
    _count?: true | CreditUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditUsageMaxAggregateInputType
  }

  export type GetCreditUsageAggregateType<T extends CreditUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditUsage[P]>
      : GetScalarType<T[P], AggregateCreditUsage[P]>
  }




  export type CreditUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditUsageWhereInput
    orderBy?: CreditUsageOrderByWithAggregationInput | CreditUsageOrderByWithAggregationInput[]
    by: CreditUsageScalarFieldEnum[] | CreditUsageScalarFieldEnum
    having?: CreditUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditUsageCountAggregateInputType | true
    _avg?: CreditUsageAvgAggregateInputType
    _sum?: CreditUsageSumAggregateInputType
    _min?: CreditUsageMinAggregateInputType
    _max?: CreditUsageMaxAggregateInputType
  }

  export type CreditUsageGroupByOutputType = {
    id: string
    userId: string
    requestId: string
    openrouterGenerationId: string | null
    modelUsed: string | null
    activityType: string
    costMicrousd: bigint
    debitMicrocredits: bigint
    tokenUsage: JsonValue | null
    balanceBeforeMicrocredits: bigint
    balanceAfterMicrocredits: bigint
    createdAt: Date
    _count: CreditUsageCountAggregateOutputType | null
    _avg: CreditUsageAvgAggregateOutputType | null
    _sum: CreditUsageSumAggregateOutputType | null
    _min: CreditUsageMinAggregateOutputType | null
    _max: CreditUsageMaxAggregateOutputType | null
  }

  type GetCreditUsageGroupByPayload<T extends CreditUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditUsageGroupByOutputType[P]>
            : GetScalarType<T[P], CreditUsageGroupByOutputType[P]>
        }
      >
    >


  export type CreditUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    requestId?: boolean
    openrouterGenerationId?: boolean
    modelUsed?: boolean
    activityType?: boolean
    costMicrousd?: boolean
    debitMicrocredits?: boolean
    tokenUsage?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditUsage"]>

  export type CreditUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    requestId?: boolean
    openrouterGenerationId?: boolean
    modelUsed?: boolean
    activityType?: boolean
    costMicrousd?: boolean
    debitMicrocredits?: boolean
    tokenUsage?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditUsage"]>

  export type CreditUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    requestId?: boolean
    openrouterGenerationId?: boolean
    modelUsed?: boolean
    activityType?: boolean
    costMicrousd?: boolean
    debitMicrocredits?: boolean
    tokenUsage?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditUsage"]>

  export type CreditUsageSelectScalar = {
    id?: boolean
    userId?: boolean
    requestId?: boolean
    openrouterGenerationId?: boolean
    modelUsed?: boolean
    activityType?: boolean
    costMicrousd?: boolean
    debitMicrocredits?: boolean
    tokenUsage?: boolean
    balanceBeforeMicrocredits?: boolean
    balanceAfterMicrocredits?: boolean
    createdAt?: boolean
  }

  export type CreditUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "requestId" | "openrouterGenerationId" | "modelUsed" | "activityType" | "costMicrousd" | "debitMicrocredits" | "tokenUsage" | "balanceBeforeMicrocredits" | "balanceAfterMicrocredits" | "createdAt", ExtArgs["result"]["creditUsage"]>
  export type CreditUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }
  export type CreditUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }
  export type CreditUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | UserWalletDefaultArgs<ExtArgs>
  }

  export type $CreditUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditUsage"
    objects: {
      wallet: Prisma.$UserWalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      requestId: string
      openrouterGenerationId: string | null
      modelUsed: string | null
      activityType: string
      costMicrousd: bigint
      debitMicrocredits: bigint
      tokenUsage: Prisma.JsonValue | null
      balanceBeforeMicrocredits: bigint
      balanceAfterMicrocredits: bigint
      createdAt: Date
    }, ExtArgs["result"]["creditUsage"]>
    composites: {}
  }

  type CreditUsageGetPayload<S extends boolean | null | undefined | CreditUsageDefaultArgs> = $Result.GetResult<Prisma.$CreditUsagePayload, S>

  type CreditUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditUsageCountAggregateInputType | true
    }

  export interface CreditUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditUsage'], meta: { name: 'CreditUsage' } }
    /**
     * Find zero or one CreditUsage that matches the filter.
     * @param {CreditUsageFindUniqueArgs} args - Arguments to find a CreditUsage
     * @example
     * // Get one CreditUsage
     * const creditUsage = await prisma.creditUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditUsageFindUniqueArgs>(args: SelectSubset<T, CreditUsageFindUniqueArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditUsageFindUniqueOrThrowArgs} args - Arguments to find a CreditUsage
     * @example
     * // Get one CreditUsage
     * const creditUsage = await prisma.creditUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageFindFirstArgs} args - Arguments to find a CreditUsage
     * @example
     * // Get one CreditUsage
     * const creditUsage = await prisma.creditUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditUsageFindFirstArgs>(args?: SelectSubset<T, CreditUsageFindFirstArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageFindFirstOrThrowArgs} args - Arguments to find a CreditUsage
     * @example
     * // Get one CreditUsage
     * const creditUsage = await prisma.creditUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditUsages
     * const creditUsages = await prisma.creditUsage.findMany()
     * 
     * // Get first 10 CreditUsages
     * const creditUsages = await prisma.creditUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditUsageWithIdOnly = await prisma.creditUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditUsageFindManyArgs>(args?: SelectSubset<T, CreditUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditUsage.
     * @param {CreditUsageCreateArgs} args - Arguments to create a CreditUsage.
     * @example
     * // Create one CreditUsage
     * const CreditUsage = await prisma.creditUsage.create({
     *   data: {
     *     // ... data to create a CreditUsage
     *   }
     * })
     * 
     */
    create<T extends CreditUsageCreateArgs>(args: SelectSubset<T, CreditUsageCreateArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditUsages.
     * @param {CreditUsageCreateManyArgs} args - Arguments to create many CreditUsages.
     * @example
     * // Create many CreditUsages
     * const creditUsage = await prisma.creditUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditUsageCreateManyArgs>(args?: SelectSubset<T, CreditUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditUsages and returns the data saved in the database.
     * @param {CreditUsageCreateManyAndReturnArgs} args - Arguments to create many CreditUsages.
     * @example
     * // Create many CreditUsages
     * const creditUsage = await prisma.creditUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditUsages and only return the `id`
     * const creditUsageWithIdOnly = await prisma.creditUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditUsage.
     * @param {CreditUsageDeleteArgs} args - Arguments to delete one CreditUsage.
     * @example
     * // Delete one CreditUsage
     * const CreditUsage = await prisma.creditUsage.delete({
     *   where: {
     *     // ... filter to delete one CreditUsage
     *   }
     * })
     * 
     */
    delete<T extends CreditUsageDeleteArgs>(args: SelectSubset<T, CreditUsageDeleteArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditUsage.
     * @param {CreditUsageUpdateArgs} args - Arguments to update one CreditUsage.
     * @example
     * // Update one CreditUsage
     * const creditUsage = await prisma.creditUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditUsageUpdateArgs>(args: SelectSubset<T, CreditUsageUpdateArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditUsages.
     * @param {CreditUsageDeleteManyArgs} args - Arguments to filter CreditUsages to delete.
     * @example
     * // Delete a few CreditUsages
     * const { count } = await prisma.creditUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditUsageDeleteManyArgs>(args?: SelectSubset<T, CreditUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditUsages
     * const creditUsage = await prisma.creditUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditUsageUpdateManyArgs>(args: SelectSubset<T, CreditUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditUsages and returns the data updated in the database.
     * @param {CreditUsageUpdateManyAndReturnArgs} args - Arguments to update many CreditUsages.
     * @example
     * // Update many CreditUsages
     * const creditUsage = await prisma.creditUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditUsages and only return the `id`
     * const creditUsageWithIdOnly = await prisma.creditUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditUsage.
     * @param {CreditUsageUpsertArgs} args - Arguments to update or create a CreditUsage.
     * @example
     * // Update or create a CreditUsage
     * const creditUsage = await prisma.creditUsage.upsert({
     *   create: {
     *     // ... data to create a CreditUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditUsage we want to update
     *   }
     * })
     */
    upsert<T extends CreditUsageUpsertArgs>(args: SelectSubset<T, CreditUsageUpsertArgs<ExtArgs>>): Prisma__CreditUsageClient<$Result.GetResult<Prisma.$CreditUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageCountArgs} args - Arguments to filter CreditUsages to count.
     * @example
     * // Count the number of CreditUsages
     * const count = await prisma.creditUsage.count({
     *   where: {
     *     // ... the filter for the CreditUsages we want to count
     *   }
     * })
    **/
    count<T extends CreditUsageCountArgs>(
      args?: Subset<T, CreditUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditUsageAggregateArgs>(args: Subset<T, CreditUsageAggregateArgs>): Prisma.PrismaPromise<GetCreditUsageAggregateType<T>>

    /**
     * Group by CreditUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditUsageGroupByArgs['orderBy'] }
        : { orderBy?: CreditUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditUsage model
   */
  readonly fields: CreditUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends UserWalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserWalletDefaultArgs<ExtArgs>>): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditUsage model
   */
  interface CreditUsageFieldRefs {
    readonly id: FieldRef<"CreditUsage", 'String'>
    readonly userId: FieldRef<"CreditUsage", 'String'>
    readonly requestId: FieldRef<"CreditUsage", 'String'>
    readonly openrouterGenerationId: FieldRef<"CreditUsage", 'String'>
    readonly modelUsed: FieldRef<"CreditUsage", 'String'>
    readonly activityType: FieldRef<"CreditUsage", 'String'>
    readonly costMicrousd: FieldRef<"CreditUsage", 'BigInt'>
    readonly debitMicrocredits: FieldRef<"CreditUsage", 'BigInt'>
    readonly tokenUsage: FieldRef<"CreditUsage", 'Json'>
    readonly balanceBeforeMicrocredits: FieldRef<"CreditUsage", 'BigInt'>
    readonly balanceAfterMicrocredits: FieldRef<"CreditUsage", 'BigInt'>
    readonly createdAt: FieldRef<"CreditUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditUsage findUnique
   */
  export type CreditUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter, which CreditUsage to fetch.
     */
    where: CreditUsageWhereUniqueInput
  }

  /**
   * CreditUsage findUniqueOrThrow
   */
  export type CreditUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter, which CreditUsage to fetch.
     */
    where: CreditUsageWhereUniqueInput
  }

  /**
   * CreditUsage findFirst
   */
  export type CreditUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter, which CreditUsage to fetch.
     */
    where?: CreditUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditUsages to fetch.
     */
    orderBy?: CreditUsageOrderByWithRelationInput | CreditUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditUsages.
     */
    cursor?: CreditUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditUsages.
     */
    distinct?: CreditUsageScalarFieldEnum | CreditUsageScalarFieldEnum[]
  }

  /**
   * CreditUsage findFirstOrThrow
   */
  export type CreditUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter, which CreditUsage to fetch.
     */
    where?: CreditUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditUsages to fetch.
     */
    orderBy?: CreditUsageOrderByWithRelationInput | CreditUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditUsages.
     */
    cursor?: CreditUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditUsages.
     */
    distinct?: CreditUsageScalarFieldEnum | CreditUsageScalarFieldEnum[]
  }

  /**
   * CreditUsage findMany
   */
  export type CreditUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter, which CreditUsages to fetch.
     */
    where?: CreditUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditUsages to fetch.
     */
    orderBy?: CreditUsageOrderByWithRelationInput | CreditUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditUsages.
     */
    cursor?: CreditUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditUsages.
     */
    skip?: number
    distinct?: CreditUsageScalarFieldEnum | CreditUsageScalarFieldEnum[]
  }

  /**
   * CreditUsage create
   */
  export type CreditUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditUsage.
     */
    data: XOR<CreditUsageCreateInput, CreditUsageUncheckedCreateInput>
  }

  /**
   * CreditUsage createMany
   */
  export type CreditUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditUsages.
     */
    data: CreditUsageCreateManyInput | CreditUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditUsage createManyAndReturn
   */
  export type CreditUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * The data used to create many CreditUsages.
     */
    data: CreditUsageCreateManyInput | CreditUsageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditUsage update
   */
  export type CreditUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditUsage.
     */
    data: XOR<CreditUsageUpdateInput, CreditUsageUncheckedUpdateInput>
    /**
     * Choose, which CreditUsage to update.
     */
    where: CreditUsageWhereUniqueInput
  }

  /**
   * CreditUsage updateMany
   */
  export type CreditUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditUsages.
     */
    data: XOR<CreditUsageUpdateManyMutationInput, CreditUsageUncheckedUpdateManyInput>
    /**
     * Filter which CreditUsages to update
     */
    where?: CreditUsageWhereInput
    /**
     * Limit how many CreditUsages to update.
     */
    limit?: number
  }

  /**
   * CreditUsage updateManyAndReturn
   */
  export type CreditUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * The data used to update CreditUsages.
     */
    data: XOR<CreditUsageUpdateManyMutationInput, CreditUsageUncheckedUpdateManyInput>
    /**
     * Filter which CreditUsages to update
     */
    where?: CreditUsageWhereInput
    /**
     * Limit how many CreditUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditUsage upsert
   */
  export type CreditUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditUsage to update in case it exists.
     */
    where: CreditUsageWhereUniqueInput
    /**
     * In case the CreditUsage found by the `where` argument doesn't exist, create a new CreditUsage with this data.
     */
    create: XOR<CreditUsageCreateInput, CreditUsageUncheckedCreateInput>
    /**
     * In case the CreditUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditUsageUpdateInput, CreditUsageUncheckedUpdateInput>
  }

  /**
   * CreditUsage delete
   */
  export type CreditUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
    /**
     * Filter which CreditUsage to delete.
     */
    where: CreditUsageWhereUniqueInput
  }

  /**
   * CreditUsage deleteMany
   */
  export type CreditUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditUsages to delete
     */
    where?: CreditUsageWhereInput
    /**
     * Limit how many CreditUsages to delete.
     */
    limit?: number
  }

  /**
   * CreditUsage without action
   */
  export type CreditUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditUsage
     */
    select?: CreditUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditUsage
     */
    omit?: CreditUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditUsageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AvailableModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    contextLength: 'contextLength',
    pricing: 'pricing',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AvailableModelScalarFieldEnum = (typeof AvailableModelScalarFieldEnum)[keyof typeof AvailableModelScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    photoURL: 'photoURL',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectMemoryScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    summary: 'summary',
    facts: 'facts',
    decisions: 'decisions',
    openQuestions: 'openQuestions',
    updatedAt: 'updatedAt'
  };

  export type ProjectMemoryScalarFieldEnum = (typeof ProjectMemoryScalarFieldEnum)[keyof typeof ProjectMemoryScalarFieldEnum]


  export const ThreadScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    title: 'title',
    mode: 'mode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ThreadScalarFieldEnum = (typeof ThreadScalarFieldEnum)[keyof typeof ThreadScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    projectId: 'projectId',
    role: 'role',
    content: 'content',
    modelUsed: 'modelUsed',
    turnNumber: 'turnNumber',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const UserWalletScalarFieldEnum: {
    userId: 'userId',
    balanceMicrocredits: 'balanceMicrocredits',
    subscriptionStatus: 'subscriptionStatus',
    currentPeriodEnd: 'currentPeriodEnd',
    capMicrocredits: 'capMicrocredits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserWalletScalarFieldEnum = (typeof UserWalletScalarFieldEnum)[keyof typeof UserWalletScalarFieldEnum]


  export const SubscriptionPaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    paymentProvider: 'paymentProvider',
    paymentProviderId: 'paymentProviderId',
    amountPaidCents: 'amountPaidCents',
    currency: 'currency',
    grantMicrocredits: 'grantMicrocredits',
    balanceBeforeMicrocredits: 'balanceBeforeMicrocredits',
    balanceAfterMicrocredits: 'balanceAfterMicrocredits',
    createdAt: 'createdAt'
  };

  export type SubscriptionPaymentScalarFieldEnum = (typeof SubscriptionPaymentScalarFieldEnum)[keyof typeof SubscriptionPaymentScalarFieldEnum]


  export const CreditUsageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    requestId: 'requestId',
    openrouterGenerationId: 'openrouterGenerationId',
    modelUsed: 'modelUsed',
    activityType: 'activityType',
    costMicrousd: 'costMicrousd',
    debitMicrocredits: 'debitMicrocredits',
    tokenUsage: 'tokenUsage',
    balanceBeforeMicrocredits: 'balanceBeforeMicrocredits',
    balanceAfterMicrocredits: 'balanceAfterMicrocredits',
    createdAt: 'createdAt'
  };

  export type CreditUsageScalarFieldEnum = (typeof CreditUsageScalarFieldEnum)[keyof typeof CreditUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AvailableModelWhereInput = {
    AND?: AvailableModelWhereInput | AvailableModelWhereInput[]
    OR?: AvailableModelWhereInput[]
    NOT?: AvailableModelWhereInput | AvailableModelWhereInput[]
    id?: StringFilter<"AvailableModel"> | string
    name?: StringFilter<"AvailableModel"> | string
    description?: StringNullableFilter<"AvailableModel"> | string | null
    contextLength?: IntNullableFilter<"AvailableModel"> | number | null
    pricing?: JsonNullableFilter<"AvailableModel">
    createdAt?: DateTimeFilter<"AvailableModel"> | Date | string
    updatedAt?: DateTimeFilter<"AvailableModel"> | Date | string
  }

  export type AvailableModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    contextLength?: SortOrderInput | SortOrder
    pricing?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailableModelWhereInput | AvailableModelWhereInput[]
    OR?: AvailableModelWhereInput[]
    NOT?: AvailableModelWhereInput | AvailableModelWhereInput[]
    name?: StringFilter<"AvailableModel"> | string
    description?: StringNullableFilter<"AvailableModel"> | string | null
    contextLength?: IntNullableFilter<"AvailableModel"> | number | null
    pricing?: JsonNullableFilter<"AvailableModel">
    createdAt?: DateTimeFilter<"AvailableModel"> | Date | string
    updatedAt?: DateTimeFilter<"AvailableModel"> | Date | string
  }, "id">

  export type AvailableModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    contextLength?: SortOrderInput | SortOrder
    pricing?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AvailableModelCountOrderByAggregateInput
    _avg?: AvailableModelAvgOrderByAggregateInput
    _max?: AvailableModelMaxOrderByAggregateInput
    _min?: AvailableModelMinOrderByAggregateInput
    _sum?: AvailableModelSumOrderByAggregateInput
  }

  export type AvailableModelScalarWhereWithAggregatesInput = {
    AND?: AvailableModelScalarWhereWithAggregatesInput | AvailableModelScalarWhereWithAggregatesInput[]
    OR?: AvailableModelScalarWhereWithAggregatesInput[]
    NOT?: AvailableModelScalarWhereWithAggregatesInput | AvailableModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailableModel"> | string
    name?: StringWithAggregatesFilter<"AvailableModel"> | string
    description?: StringNullableWithAggregatesFilter<"AvailableModel"> | string | null
    contextLength?: IntNullableWithAggregatesFilter<"AvailableModel"> | number | null
    pricing?: JsonNullableWithAggregatesFilter<"AvailableModel">
    createdAt?: DateTimeWithAggregatesFilter<"AvailableModel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AvailableModel"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    photoURL?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    wallet?: XOR<UserWalletNullableScalarRelationFilter, UserWalletWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    photoURL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    wallet?: UserWalletOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    photoURL?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    wallet?: XOR<UserWalletNullableScalarRelationFilter, UserWalletWhereInput> | null
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    photoURL?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    photoURL?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projectMemory?: XOR<ProjectMemoryNullableScalarRelationFilter, ProjectMemoryWhereInput> | null
    threads?: ThreadListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    projectMemory?: ProjectMemoryOrderByWithRelationInput
    threads?: ThreadOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    projectMemory?: XOR<ProjectMemoryNullableScalarRelationFilter, ProjectMemoryWhereInput> | null
    threads?: ThreadListRelationFilter
    messages?: MessageListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    userId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectMemoryWhereInput = {
    AND?: ProjectMemoryWhereInput | ProjectMemoryWhereInput[]
    OR?: ProjectMemoryWhereInput[]
    NOT?: ProjectMemoryWhereInput | ProjectMemoryWhereInput[]
    id?: StringFilter<"ProjectMemory"> | string
    projectId?: StringFilter<"ProjectMemory"> | string
    summary?: StringFilter<"ProjectMemory"> | string
    facts?: JsonFilter<"ProjectMemory">
    decisions?: JsonFilter<"ProjectMemory">
    openQuestions?: JsonFilter<"ProjectMemory">
    updatedAt?: DateTimeFilter<"ProjectMemory"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectMemoryOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    summary?: SortOrder
    facts?: SortOrder
    decisions?: SortOrder
    openQuestions?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectMemoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: ProjectMemoryWhereInput | ProjectMemoryWhereInput[]
    OR?: ProjectMemoryWhereInput[]
    NOT?: ProjectMemoryWhereInput | ProjectMemoryWhereInput[]
    summary?: StringFilter<"ProjectMemory"> | string
    facts?: JsonFilter<"ProjectMemory">
    decisions?: JsonFilter<"ProjectMemory">
    openQuestions?: JsonFilter<"ProjectMemory">
    updatedAt?: DateTimeFilter<"ProjectMemory"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type ProjectMemoryOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    summary?: SortOrder
    facts?: SortOrder
    decisions?: SortOrder
    openQuestions?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectMemoryCountOrderByAggregateInput
    _max?: ProjectMemoryMaxOrderByAggregateInput
    _min?: ProjectMemoryMinOrderByAggregateInput
  }

  export type ProjectMemoryScalarWhereWithAggregatesInput = {
    AND?: ProjectMemoryScalarWhereWithAggregatesInput | ProjectMemoryScalarWhereWithAggregatesInput[]
    OR?: ProjectMemoryScalarWhereWithAggregatesInput[]
    NOT?: ProjectMemoryScalarWhereWithAggregatesInput | ProjectMemoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectMemory"> | string
    projectId?: StringWithAggregatesFilter<"ProjectMemory"> | string
    summary?: StringWithAggregatesFilter<"ProjectMemory"> | string
    facts?: JsonWithAggregatesFilter<"ProjectMemory">
    decisions?: JsonWithAggregatesFilter<"ProjectMemory">
    openQuestions?: JsonWithAggregatesFilter<"ProjectMemory">
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectMemory"> | Date | string
  }

  export type ThreadWhereInput = {
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    id?: StringFilter<"Thread"> | string
    projectId?: StringFilter<"Thread"> | string
    title?: StringFilter<"Thread"> | string
    mode?: StringFilter<"Thread"> | string
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    messages?: MessageListRelationFilter
  }

  export type ThreadOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    mode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ThreadWhereInput | ThreadWhereInput[]
    OR?: ThreadWhereInput[]
    NOT?: ThreadWhereInput | ThreadWhereInput[]
    projectId?: StringFilter<"Thread"> | string
    title?: StringFilter<"Thread"> | string
    mode?: StringFilter<"Thread"> | string
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    messages?: MessageListRelationFilter
  }, "id">

  export type ThreadOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    mode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ThreadCountOrderByAggregateInput
    _max?: ThreadMaxOrderByAggregateInput
    _min?: ThreadMinOrderByAggregateInput
  }

  export type ThreadScalarWhereWithAggregatesInput = {
    AND?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    OR?: ThreadScalarWhereWithAggregatesInput[]
    NOT?: ThreadScalarWhereWithAggregatesInput | ThreadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Thread"> | string
    projectId?: StringWithAggregatesFilter<"Thread"> | string
    title?: StringWithAggregatesFilter<"Thread"> | string
    mode?: StringWithAggregatesFilter<"Thread"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Thread"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Thread"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    threadId?: StringFilter<"Message"> | string
    projectId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    modelUsed?: StringNullableFilter<"Message"> | string | null
    turnNumber?: IntFilter<"Message"> | number
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    thread?: XOR<ThreadScalarRelationFilter, ThreadWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    modelUsed?: SortOrderInput | SortOrder
    turnNumber?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    thread?: ThreadOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    threadId?: StringFilter<"Message"> | string
    projectId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    modelUsed?: StringNullableFilter<"Message"> | string | null
    turnNumber?: IntFilter<"Message"> | number
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    thread?: XOR<ThreadScalarRelationFilter, ThreadWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    modelUsed?: SortOrderInput | SortOrder
    turnNumber?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    threadId?: StringWithAggregatesFilter<"Message"> | string
    projectId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    modelUsed?: StringNullableWithAggregatesFilter<"Message"> | string | null
    turnNumber?: IntWithAggregatesFilter<"Message"> | number
    metadata?: JsonNullableWithAggregatesFilter<"Message">
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserWalletWhereInput = {
    AND?: UserWalletWhereInput | UserWalletWhereInput[]
    OR?: UserWalletWhereInput[]
    NOT?: UserWalletWhereInput | UserWalletWhereInput[]
    userId?: StringFilter<"UserWallet"> | string
    balanceMicrocredits?: BigIntFilter<"UserWallet"> | bigint | number
    subscriptionStatus?: StringFilter<"UserWallet"> | string
    currentPeriodEnd?: DateTimeNullableFilter<"UserWallet"> | Date | string | null
    capMicrocredits?: BigIntFilter<"UserWallet"> | bigint | number
    createdAt?: DateTimeFilter<"UserWallet"> | Date | string
    updatedAt?: DateTimeFilter<"UserWallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subscriptionPayments?: SubscriptionPaymentListRelationFilter
    creditUsage?: CreditUsageListRelationFilter
  }

  export type UserWalletOrderByWithRelationInput = {
    userId?: SortOrder
    balanceMicrocredits?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    capMicrocredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    subscriptionPayments?: SubscriptionPaymentOrderByRelationAggregateInput
    creditUsage?: CreditUsageOrderByRelationAggregateInput
  }

  export type UserWalletWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserWalletWhereInput | UserWalletWhereInput[]
    OR?: UserWalletWhereInput[]
    NOT?: UserWalletWhereInput | UserWalletWhereInput[]
    balanceMicrocredits?: BigIntFilter<"UserWallet"> | bigint | number
    subscriptionStatus?: StringFilter<"UserWallet"> | string
    currentPeriodEnd?: DateTimeNullableFilter<"UserWallet"> | Date | string | null
    capMicrocredits?: BigIntFilter<"UserWallet"> | bigint | number
    createdAt?: DateTimeFilter<"UserWallet"> | Date | string
    updatedAt?: DateTimeFilter<"UserWallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subscriptionPayments?: SubscriptionPaymentListRelationFilter
    creditUsage?: CreditUsageListRelationFilter
  }, "userId">

  export type UserWalletOrderByWithAggregationInput = {
    userId?: SortOrder
    balanceMicrocredits?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    capMicrocredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserWalletCountOrderByAggregateInput
    _avg?: UserWalletAvgOrderByAggregateInput
    _max?: UserWalletMaxOrderByAggregateInput
    _min?: UserWalletMinOrderByAggregateInput
    _sum?: UserWalletSumOrderByAggregateInput
  }

  export type UserWalletScalarWhereWithAggregatesInput = {
    AND?: UserWalletScalarWhereWithAggregatesInput | UserWalletScalarWhereWithAggregatesInput[]
    OR?: UserWalletScalarWhereWithAggregatesInput[]
    NOT?: UserWalletScalarWhereWithAggregatesInput | UserWalletScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserWallet"> | string
    balanceMicrocredits?: BigIntWithAggregatesFilter<"UserWallet"> | bigint | number
    subscriptionStatus?: StringWithAggregatesFilter<"UserWallet"> | string
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"UserWallet"> | Date | string | null
    capMicrocredits?: BigIntWithAggregatesFilter<"UserWallet"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"UserWallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserWallet"> | Date | string
  }

  export type SubscriptionPaymentWhereInput = {
    AND?: SubscriptionPaymentWhereInput | SubscriptionPaymentWhereInput[]
    OR?: SubscriptionPaymentWhereInput[]
    NOT?: SubscriptionPaymentWhereInput | SubscriptionPaymentWhereInput[]
    id?: StringFilter<"SubscriptionPayment"> | string
    userId?: StringFilter<"SubscriptionPayment"> | string
    paymentProvider?: StringFilter<"SubscriptionPayment"> | string
    paymentProviderId?: StringFilter<"SubscriptionPayment"> | string
    amountPaidCents?: IntFilter<"SubscriptionPayment"> | number
    currency?: StringFilter<"SubscriptionPayment"> | string
    grantMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceBeforeMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    createdAt?: DateTimeFilter<"SubscriptionPayment"> | Date | string
    wallet?: XOR<UserWalletScalarRelationFilter, UserWalletWhereInput>
  }

  export type SubscriptionPaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentProvider?: SortOrder
    paymentProviderId?: SortOrder
    amountPaidCents?: SortOrder
    currency?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
    wallet?: UserWalletOrderByWithRelationInput
  }

  export type SubscriptionPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentProviderId?: string
    AND?: SubscriptionPaymentWhereInput | SubscriptionPaymentWhereInput[]
    OR?: SubscriptionPaymentWhereInput[]
    NOT?: SubscriptionPaymentWhereInput | SubscriptionPaymentWhereInput[]
    userId?: StringFilter<"SubscriptionPayment"> | string
    paymentProvider?: StringFilter<"SubscriptionPayment"> | string
    amountPaidCents?: IntFilter<"SubscriptionPayment"> | number
    currency?: StringFilter<"SubscriptionPayment"> | string
    grantMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceBeforeMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    createdAt?: DateTimeFilter<"SubscriptionPayment"> | Date | string
    wallet?: XOR<UserWalletScalarRelationFilter, UserWalletWhereInput>
  }, "id" | "paymentProviderId">

  export type SubscriptionPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentProvider?: SortOrder
    paymentProviderId?: SortOrder
    amountPaidCents?: SortOrder
    currency?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
    _count?: SubscriptionPaymentCountOrderByAggregateInput
    _avg?: SubscriptionPaymentAvgOrderByAggregateInput
    _max?: SubscriptionPaymentMaxOrderByAggregateInput
    _min?: SubscriptionPaymentMinOrderByAggregateInput
    _sum?: SubscriptionPaymentSumOrderByAggregateInput
  }

  export type SubscriptionPaymentScalarWhereWithAggregatesInput = {
    AND?: SubscriptionPaymentScalarWhereWithAggregatesInput | SubscriptionPaymentScalarWhereWithAggregatesInput[]
    OR?: SubscriptionPaymentScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionPaymentScalarWhereWithAggregatesInput | SubscriptionPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionPayment"> | string
    userId?: StringWithAggregatesFilter<"SubscriptionPayment"> | string
    paymentProvider?: StringWithAggregatesFilter<"SubscriptionPayment"> | string
    paymentProviderId?: StringWithAggregatesFilter<"SubscriptionPayment"> | string
    amountPaidCents?: IntWithAggregatesFilter<"SubscriptionPayment"> | number
    currency?: StringWithAggregatesFilter<"SubscriptionPayment"> | string
    grantMicrocredits?: BigIntWithAggregatesFilter<"SubscriptionPayment"> | bigint | number
    balanceBeforeMicrocredits?: BigIntWithAggregatesFilter<"SubscriptionPayment"> | bigint | number
    balanceAfterMicrocredits?: BigIntWithAggregatesFilter<"SubscriptionPayment"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionPayment"> | Date | string
  }

  export type CreditUsageWhereInput = {
    AND?: CreditUsageWhereInput | CreditUsageWhereInput[]
    OR?: CreditUsageWhereInput[]
    NOT?: CreditUsageWhereInput | CreditUsageWhereInput[]
    id?: StringFilter<"CreditUsage"> | string
    userId?: StringFilter<"CreditUsage"> | string
    requestId?: StringFilter<"CreditUsage"> | string
    openrouterGenerationId?: StringNullableFilter<"CreditUsage"> | string | null
    modelUsed?: StringNullableFilter<"CreditUsage"> | string | null
    activityType?: StringFilter<"CreditUsage"> | string
    costMicrousd?: BigIntFilter<"CreditUsage"> | bigint | number
    debitMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    tokenUsage?: JsonNullableFilter<"CreditUsage">
    balanceBeforeMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    createdAt?: DateTimeFilter<"CreditUsage"> | Date | string
    wallet?: XOR<UserWalletScalarRelationFilter, UserWalletWhereInput>
  }

  export type CreditUsageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    requestId?: SortOrder
    openrouterGenerationId?: SortOrderInput | SortOrder
    modelUsed?: SortOrderInput | SortOrder
    activityType?: SortOrder
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    tokenUsage?: SortOrderInput | SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
    wallet?: UserWalletOrderByWithRelationInput
  }

  export type CreditUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requestId?: string
    AND?: CreditUsageWhereInput | CreditUsageWhereInput[]
    OR?: CreditUsageWhereInput[]
    NOT?: CreditUsageWhereInput | CreditUsageWhereInput[]
    userId?: StringFilter<"CreditUsage"> | string
    openrouterGenerationId?: StringNullableFilter<"CreditUsage"> | string | null
    modelUsed?: StringNullableFilter<"CreditUsage"> | string | null
    activityType?: StringFilter<"CreditUsage"> | string
    costMicrousd?: BigIntFilter<"CreditUsage"> | bigint | number
    debitMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    tokenUsage?: JsonNullableFilter<"CreditUsage">
    balanceBeforeMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    createdAt?: DateTimeFilter<"CreditUsage"> | Date | string
    wallet?: XOR<UserWalletScalarRelationFilter, UserWalletWhereInput>
  }, "id" | "requestId">

  export type CreditUsageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    requestId?: SortOrder
    openrouterGenerationId?: SortOrderInput | SortOrder
    modelUsed?: SortOrderInput | SortOrder
    activityType?: SortOrder
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    tokenUsage?: SortOrderInput | SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
    _count?: CreditUsageCountOrderByAggregateInput
    _avg?: CreditUsageAvgOrderByAggregateInput
    _max?: CreditUsageMaxOrderByAggregateInput
    _min?: CreditUsageMinOrderByAggregateInput
    _sum?: CreditUsageSumOrderByAggregateInput
  }

  export type CreditUsageScalarWhereWithAggregatesInput = {
    AND?: CreditUsageScalarWhereWithAggregatesInput | CreditUsageScalarWhereWithAggregatesInput[]
    OR?: CreditUsageScalarWhereWithAggregatesInput[]
    NOT?: CreditUsageScalarWhereWithAggregatesInput | CreditUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditUsage"> | string
    userId?: StringWithAggregatesFilter<"CreditUsage"> | string
    requestId?: StringWithAggregatesFilter<"CreditUsage"> | string
    openrouterGenerationId?: StringNullableWithAggregatesFilter<"CreditUsage"> | string | null
    modelUsed?: StringNullableWithAggregatesFilter<"CreditUsage"> | string | null
    activityType?: StringWithAggregatesFilter<"CreditUsage"> | string
    costMicrousd?: BigIntWithAggregatesFilter<"CreditUsage"> | bigint | number
    debitMicrocredits?: BigIntWithAggregatesFilter<"CreditUsage"> | bigint | number
    tokenUsage?: JsonNullableWithAggregatesFilter<"CreditUsage">
    balanceBeforeMicrocredits?: BigIntWithAggregatesFilter<"CreditUsage"> | bigint | number
    balanceAfterMicrocredits?: BigIntWithAggregatesFilter<"CreditUsage"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"CreditUsage"> | Date | string
  }

  export type AvailableModelCreateInput = {
    id?: string
    name: string
    description?: string | null
    contextLength?: number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableModelUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    contextLength?: number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contextLength?: NullableIntFieldUpdateOperationsInput | number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contextLength?: NullableIntFieldUpdateOperationsInput | number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableModelCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    contextLength?: number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailableModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contextLength?: NullableIntFieldUpdateOperationsInput | number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailableModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    contextLength?: NullableIntFieldUpdateOperationsInput | number | null
    pricing?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    wallet?: UserWalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    wallet?: UserWalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    wallet?: UserWalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    wallet?: UserWalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    projectMemory?: ProjectMemoryCreateNestedOneWithoutProjectInput
    threads?: ThreadCreateNestedManyWithoutProjectInput
    messages?: MessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    projectMemory?: ProjectMemoryUncheckedCreateNestedOneWithoutProjectInput
    threads?: ThreadUncheckedCreateNestedManyWithoutProjectInput
    messages?: MessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    projectMemory?: ProjectMemoryUpdateOneWithoutProjectNestedInput
    threads?: ThreadUpdateManyWithoutProjectNestedInput
    messages?: MessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMemory?: ProjectMemoryUncheckedUpdateOneWithoutProjectNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutProjectNestedInput
    messages?: MessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    userId: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemoryCreateInput = {
    id?: string
    summary?: string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutProjectMemoryInput
  }

  export type ProjectMemoryUncheckedCreateInput = {
    id?: string
    projectId: string
    summary?: string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type ProjectMemoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProjectMemoryNestedInput
  }

  export type ProjectMemoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemoryCreateManyInput = {
    id?: string
    projectId: string
    summary?: string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type ProjectMemoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCreateInput = {
    id?: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutThreadsInput
    messages?: MessageCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateInput = {
    id?: string
    projectId: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutThreadsNestedInput
    messages?: MessageUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ThreadCreateManyInput = {
    id?: string
    projectId: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type ThreadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
    thread: ThreadCreateNestedOneWithoutMessagesInput
    project: ProjectCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    threadId: string
    projectId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: ThreadUpdateOneRequiredWithoutMessagesNestedInput
    project?: ProjectUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    threadId: string
    projectId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWalletCreateInput = {
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
    subscriptionPayments?: SubscriptionPaymentCreateNestedManyWithoutWalletInput
    creditUsage?: CreditUsageCreateNestedManyWithoutWalletInput
  }

  export type UserWalletUncheckedCreateInput = {
    userId: string
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedCreateNestedManyWithoutWalletInput
    creditUsage?: CreditUsageUncheckedCreateNestedManyWithoutWalletInput
  }

  export type UserWalletUpdateInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    subscriptionPayments?: SubscriptionPaymentUpdateManyWithoutWalletNestedInput
    creditUsage?: CreditUsageUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedUpdateManyWithoutWalletNestedInput
    creditUsage?: CreditUsageUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletCreateManyInput = {
    userId: string
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWalletUpdateManyMutationInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWalletUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentCreateInput = {
    id?: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
    wallet: UserWalletCreateNestedOneWithoutSubscriptionPaymentsInput
  }

  export type SubscriptionPaymentUncheckedCreateInput = {
    id?: string
    userId: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type SubscriptionPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: UserWalletUpdateOneRequiredWithoutSubscriptionPaymentsNestedInput
  }

  export type SubscriptionPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentCreateManyInput = {
    id?: string
    userId: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type SubscriptionPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageCreateInput = {
    id?: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
    wallet: UserWalletCreateNestedOneWithoutCreditUsageInput
  }

  export type CreditUsageUncheckedCreateInput = {
    id?: string
    userId: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type CreditUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: UserWalletUpdateOneRequiredWithoutCreditUsageNestedInput
  }

  export type CreditUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageCreateManyInput = {
    id?: string
    userId: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type CreditUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AvailableModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    contextLength?: SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableModelAvgOrderByAggregateInput = {
    contextLength?: SortOrder
  }

  export type AvailableModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    contextLength?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    contextLength?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailableModelSumOrderByAggregateInput = {
    contextLength?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type UserWalletNullableScalarRelationFilter = {
    is?: UserWalletWhereInput | null
    isNot?: UserWalletWhereInput | null
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    photoURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    photoURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    photoURL?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectMemoryNullableScalarRelationFilter = {
    is?: ProjectMemoryWhereInput | null
    isNot?: ProjectMemoryWhereInput | null
  }

  export type ThreadListRelationFilter = {
    every?: ThreadWhereInput
    some?: ThreadWhereInput
    none?: ThreadWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ThreadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectMemoryCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    summary?: SortOrder
    facts?: SortOrder
    decisions?: SortOrder
    openQuestions?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMemoryMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    summary?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMemoryMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    summary?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ThreadCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    mode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThreadMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    mode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ThreadMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    mode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ThreadScalarRelationFilter = {
    is?: ThreadWhereInput
    isNot?: ThreadWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    modelUsed?: SortOrder
    turnNumber?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    turnNumber?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    modelUsed?: SortOrder
    turnNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    modelUsed?: SortOrder
    turnNumber?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    turnNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SubscriptionPaymentListRelationFilter = {
    every?: SubscriptionPaymentWhereInput
    some?: SubscriptionPaymentWhereInput
    none?: SubscriptionPaymentWhereInput
  }

  export type CreditUsageListRelationFilter = {
    every?: CreditUsageWhereInput
    some?: CreditUsageWhereInput
    none?: CreditUsageWhereInput
  }

  export type SubscriptionPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserWalletCountOrderByAggregateInput = {
    userId?: SortOrder
    balanceMicrocredits?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    capMicrocredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWalletAvgOrderByAggregateInput = {
    balanceMicrocredits?: SortOrder
    capMicrocredits?: SortOrder
  }

  export type UserWalletMaxOrderByAggregateInput = {
    userId?: SortOrder
    balanceMicrocredits?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    capMicrocredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWalletMinOrderByAggregateInput = {
    userId?: SortOrder
    balanceMicrocredits?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    capMicrocredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWalletSumOrderByAggregateInput = {
    balanceMicrocredits?: SortOrder
    capMicrocredits?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserWalletScalarRelationFilter = {
    is?: UserWalletWhereInput
    isNot?: UserWalletWhereInput
  }

  export type SubscriptionPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentProvider?: SortOrder
    paymentProviderId?: SortOrder
    amountPaidCents?: SortOrder
    currency?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionPaymentAvgOrderByAggregateInput = {
    amountPaidCents?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
  }

  export type SubscriptionPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentProvider?: SortOrder
    paymentProviderId?: SortOrder
    amountPaidCents?: SortOrder
    currency?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    paymentProvider?: SortOrder
    paymentProviderId?: SortOrder
    amountPaidCents?: SortOrder
    currency?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type SubscriptionPaymentSumOrderByAggregateInput = {
    amountPaidCents?: SortOrder
    grantMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
  }

  export type CreditUsageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    requestId?: SortOrder
    openrouterGenerationId?: SortOrder
    modelUsed?: SortOrder
    activityType?: SortOrder
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    tokenUsage?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditUsageAvgOrderByAggregateInput = {
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
  }

  export type CreditUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    requestId?: SortOrder
    openrouterGenerationId?: SortOrder
    modelUsed?: SortOrder
    activityType?: SortOrder
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditUsageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    requestId?: SortOrder
    openrouterGenerationId?: SortOrder
    modelUsed?: SortOrder
    activityType?: SortOrder
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditUsageSumOrderByAggregateInput = {
    costMicrousd?: SortOrder
    debitMicrocredits?: SortOrder
    balanceBeforeMicrocredits?: SortOrder
    balanceAfterMicrocredits?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserWalletCreateNestedOneWithoutUserInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput
    connect?: UserWalletWhereUniqueInput
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserWalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput
    connect?: UserWalletWhereUniqueInput
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserWalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput
    upsert?: UserWalletUpsertWithoutUserInput
    disconnect?: UserWalletWhereInput | boolean
    delete?: UserWalletWhereInput | boolean
    connect?: UserWalletWhereUniqueInput
    update?: XOR<XOR<UserWalletUpdateToOneWithWhereWithoutUserInput, UserWalletUpdateWithoutUserInput>, UserWalletUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserWalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput
    upsert?: UserWalletUpsertWithoutUserInput
    disconnect?: UserWalletWhereInput | boolean
    delete?: UserWalletWhereInput | boolean
    connect?: UserWalletWhereUniqueInput
    update?: XOR<XOR<UserWalletUpdateToOneWithWhereWithoutUserInput, UserWalletUpdateWithoutUserInput>, UserWalletUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectMemoryCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectMemoryCreateOrConnectWithoutProjectInput
    connect?: ProjectMemoryWhereUniqueInput
  }

  export type ThreadCreateNestedManyWithoutProjectInput = {
    create?: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput> | ThreadCreateWithoutProjectInput[] | ThreadUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutProjectInput | ThreadCreateOrConnectWithoutProjectInput[]
    createMany?: ThreadCreateManyProjectInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutProjectInput = {
    create?: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput> | MessageCreateWithoutProjectInput[] | MessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutProjectInput | MessageCreateOrConnectWithoutProjectInput[]
    createMany?: MessageCreateManyProjectInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ProjectMemoryUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectMemoryCreateOrConnectWithoutProjectInput
    connect?: ProjectMemoryWhereUniqueInput
  }

  export type ThreadUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput> | ThreadCreateWithoutProjectInput[] | ThreadUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutProjectInput | ThreadCreateOrConnectWithoutProjectInput[]
    createMany?: ThreadCreateManyProjectInputEnvelope
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput> | MessageCreateWithoutProjectInput[] | MessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutProjectInput | MessageCreateOrConnectWithoutProjectInput[]
    createMany?: MessageCreateManyProjectInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectMemoryUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectMemoryCreateOrConnectWithoutProjectInput
    upsert?: ProjectMemoryUpsertWithoutProjectInput
    disconnect?: ProjectMemoryWhereInput | boolean
    delete?: ProjectMemoryWhereInput | boolean
    connect?: ProjectMemoryWhereUniqueInput
    update?: XOR<XOR<ProjectMemoryUpdateToOneWithWhereWithoutProjectInput, ProjectMemoryUpdateWithoutProjectInput>, ProjectMemoryUncheckedUpdateWithoutProjectInput>
  }

  export type ThreadUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput> | ThreadCreateWithoutProjectInput[] | ThreadUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutProjectInput | ThreadCreateOrConnectWithoutProjectInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutProjectInput | ThreadUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ThreadCreateManyProjectInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutProjectInput | ThreadUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutProjectInput | ThreadUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput> | MessageCreateWithoutProjectInput[] | MessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutProjectInput | MessageCreateOrConnectWithoutProjectInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutProjectInput | MessageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MessageCreateManyProjectInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutProjectInput | MessageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutProjectInput | MessageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ProjectMemoryUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectMemoryCreateOrConnectWithoutProjectInput
    upsert?: ProjectMemoryUpsertWithoutProjectInput
    disconnect?: ProjectMemoryWhereInput | boolean
    delete?: ProjectMemoryWhereInput | boolean
    connect?: ProjectMemoryWhereUniqueInput
    update?: XOR<XOR<ProjectMemoryUpdateToOneWithWhereWithoutProjectInput, ProjectMemoryUpdateWithoutProjectInput>, ProjectMemoryUncheckedUpdateWithoutProjectInput>
  }

  export type ThreadUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput> | ThreadCreateWithoutProjectInput[] | ThreadUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ThreadCreateOrConnectWithoutProjectInput | ThreadCreateOrConnectWithoutProjectInput[]
    upsert?: ThreadUpsertWithWhereUniqueWithoutProjectInput | ThreadUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ThreadCreateManyProjectInputEnvelope
    set?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    disconnect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    delete?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    connect?: ThreadWhereUniqueInput | ThreadWhereUniqueInput[]
    update?: ThreadUpdateWithWhereUniqueWithoutProjectInput | ThreadUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ThreadUpdateManyWithWhereWithoutProjectInput | ThreadUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput> | MessageCreateWithoutProjectInput[] | MessageUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutProjectInput | MessageCreateOrConnectWithoutProjectInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutProjectInput | MessageUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: MessageCreateManyProjectInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutProjectInput | MessageUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutProjectInput | MessageUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutProjectMemoryInput = {
    create?: XOR<ProjectCreateWithoutProjectMemoryInput, ProjectUncheckedCreateWithoutProjectMemoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMemoryInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProjectMemoryNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectMemoryInput, ProjectUncheckedCreateWithoutProjectMemoryInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectMemoryInput
    upsert?: ProjectUpsertWithoutProjectMemoryInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectMemoryInput, ProjectUpdateWithoutProjectMemoryInput>, ProjectUncheckedUpdateWithoutProjectMemoryInput>
  }

  export type ProjectCreateNestedOneWithoutThreadsInput = {
    create?: XOR<ProjectCreateWithoutThreadsInput, ProjectUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutThreadsInput
    connect?: ProjectWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutThreadInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutThreadInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ProjectUpdateOneRequiredWithoutThreadsNestedInput = {
    create?: XOR<ProjectCreateWithoutThreadsInput, ProjectUncheckedCreateWithoutThreadsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutThreadsInput
    upsert?: ProjectUpsertWithoutThreadsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutThreadsInput, ProjectUpdateWithoutThreadsInput>, ProjectUncheckedUpdateWithoutThreadsInput>
  }

  export type MessageUpdateManyWithoutThreadNestedInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutThreadInput | MessageUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutThreadInput | MessageUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutThreadInput | MessageUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput> | MessageCreateWithoutThreadInput[] | MessageUncheckedCreateWithoutThreadInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutThreadInput | MessageCreateOrConnectWithoutThreadInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutThreadInput | MessageUpsertWithWhereUniqueWithoutThreadInput[]
    createMany?: MessageCreateManyThreadInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutThreadInput | MessageUpdateWithWhereUniqueWithoutThreadInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutThreadInput | MessageUpdateManyWithWhereWithoutThreadInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ThreadCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ThreadCreateWithoutMessagesInput, ThreadUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutMessagesInput
    connect?: ThreadWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ProjectCreateWithoutMessagesInput, ProjectUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMessagesInput
    connect?: ProjectWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ThreadUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ThreadCreateWithoutMessagesInput, ThreadUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ThreadCreateOrConnectWithoutMessagesInput
    upsert?: ThreadUpsertWithoutMessagesInput
    connect?: ThreadWhereUniqueInput
    update?: XOR<XOR<ThreadUpdateToOneWithWhereWithoutMessagesInput, ThreadUpdateWithoutMessagesInput>, ThreadUncheckedUpdateWithoutMessagesInput>
  }

  export type ProjectUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ProjectCreateWithoutMessagesInput, ProjectUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMessagesInput
    upsert?: ProjectUpsertWithoutMessagesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMessagesInput, ProjectUpdateWithoutMessagesInput>, ProjectUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type SubscriptionPaymentCreateNestedManyWithoutWalletInput = {
    create?: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput> | SubscriptionPaymentCreateWithoutWalletInput[] | SubscriptionPaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SubscriptionPaymentCreateOrConnectWithoutWalletInput | SubscriptionPaymentCreateOrConnectWithoutWalletInput[]
    createMany?: SubscriptionPaymentCreateManyWalletInputEnvelope
    connect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
  }

  export type CreditUsageCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput> | CreditUsageCreateWithoutWalletInput[] | CreditUsageUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditUsageCreateOrConnectWithoutWalletInput | CreditUsageCreateOrConnectWithoutWalletInput[]
    createMany?: CreditUsageCreateManyWalletInputEnvelope
    connect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
  }

  export type SubscriptionPaymentUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput> | SubscriptionPaymentCreateWithoutWalletInput[] | SubscriptionPaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SubscriptionPaymentCreateOrConnectWithoutWalletInput | SubscriptionPaymentCreateOrConnectWithoutWalletInput[]
    createMany?: SubscriptionPaymentCreateManyWalletInputEnvelope
    connect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
  }

  export type CreditUsageUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput> | CreditUsageCreateWithoutWalletInput[] | CreditUsageUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditUsageCreateOrConnectWithoutWalletInput | CreditUsageCreateOrConnectWithoutWalletInput[]
    createMany?: CreditUsageCreateManyWalletInputEnvelope
    connect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type SubscriptionPaymentUpdateManyWithoutWalletNestedInput = {
    create?: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput> | SubscriptionPaymentCreateWithoutWalletInput[] | SubscriptionPaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SubscriptionPaymentCreateOrConnectWithoutWalletInput | SubscriptionPaymentCreateOrConnectWithoutWalletInput[]
    upsert?: SubscriptionPaymentUpsertWithWhereUniqueWithoutWalletInput | SubscriptionPaymentUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: SubscriptionPaymentCreateManyWalletInputEnvelope
    set?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    disconnect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    delete?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    connect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    update?: SubscriptionPaymentUpdateWithWhereUniqueWithoutWalletInput | SubscriptionPaymentUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: SubscriptionPaymentUpdateManyWithWhereWithoutWalletInput | SubscriptionPaymentUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: SubscriptionPaymentScalarWhereInput | SubscriptionPaymentScalarWhereInput[]
  }

  export type CreditUsageUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput> | CreditUsageCreateWithoutWalletInput[] | CreditUsageUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditUsageCreateOrConnectWithoutWalletInput | CreditUsageCreateOrConnectWithoutWalletInput[]
    upsert?: CreditUsageUpsertWithWhereUniqueWithoutWalletInput | CreditUsageUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditUsageCreateManyWalletInputEnvelope
    set?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    disconnect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    delete?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    connect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    update?: CreditUsageUpdateWithWhereUniqueWithoutWalletInput | CreditUsageUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditUsageUpdateManyWithWhereWithoutWalletInput | CreditUsageUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditUsageScalarWhereInput | CreditUsageScalarWhereInput[]
  }

  export type SubscriptionPaymentUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput> | SubscriptionPaymentCreateWithoutWalletInput[] | SubscriptionPaymentUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: SubscriptionPaymentCreateOrConnectWithoutWalletInput | SubscriptionPaymentCreateOrConnectWithoutWalletInput[]
    upsert?: SubscriptionPaymentUpsertWithWhereUniqueWithoutWalletInput | SubscriptionPaymentUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: SubscriptionPaymentCreateManyWalletInputEnvelope
    set?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    disconnect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    delete?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    connect?: SubscriptionPaymentWhereUniqueInput | SubscriptionPaymentWhereUniqueInput[]
    update?: SubscriptionPaymentUpdateWithWhereUniqueWithoutWalletInput | SubscriptionPaymentUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: SubscriptionPaymentUpdateManyWithWhereWithoutWalletInput | SubscriptionPaymentUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: SubscriptionPaymentScalarWhereInput | SubscriptionPaymentScalarWhereInput[]
  }

  export type CreditUsageUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput> | CreditUsageCreateWithoutWalletInput[] | CreditUsageUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditUsageCreateOrConnectWithoutWalletInput | CreditUsageCreateOrConnectWithoutWalletInput[]
    upsert?: CreditUsageUpsertWithWhereUniqueWithoutWalletInput | CreditUsageUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditUsageCreateManyWalletInputEnvelope
    set?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    disconnect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    delete?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    connect?: CreditUsageWhereUniqueInput | CreditUsageWhereUniqueInput[]
    update?: CreditUsageUpdateWithWhereUniqueWithoutWalletInput | CreditUsageUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditUsageUpdateManyWithWhereWithoutWalletInput | CreditUsageUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditUsageScalarWhereInput | CreditUsageScalarWhereInput[]
  }

  export type UserWalletCreateNestedOneWithoutSubscriptionPaymentsInput = {
    create?: XOR<UserWalletCreateWithoutSubscriptionPaymentsInput, UserWalletUncheckedCreateWithoutSubscriptionPaymentsInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutSubscriptionPaymentsInput
    connect?: UserWalletWhereUniqueInput
  }

  export type UserWalletUpdateOneRequiredWithoutSubscriptionPaymentsNestedInput = {
    create?: XOR<UserWalletCreateWithoutSubscriptionPaymentsInput, UserWalletUncheckedCreateWithoutSubscriptionPaymentsInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutSubscriptionPaymentsInput
    upsert?: UserWalletUpsertWithoutSubscriptionPaymentsInput
    connect?: UserWalletWhereUniqueInput
    update?: XOR<XOR<UserWalletUpdateToOneWithWhereWithoutSubscriptionPaymentsInput, UserWalletUpdateWithoutSubscriptionPaymentsInput>, UserWalletUncheckedUpdateWithoutSubscriptionPaymentsInput>
  }

  export type UserWalletCreateNestedOneWithoutCreditUsageInput = {
    create?: XOR<UserWalletCreateWithoutCreditUsageInput, UserWalletUncheckedCreateWithoutCreditUsageInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutCreditUsageInput
    connect?: UserWalletWhereUniqueInput
  }

  export type UserWalletUpdateOneRequiredWithoutCreditUsageNestedInput = {
    create?: XOR<UserWalletCreateWithoutCreditUsageInput, UserWalletUncheckedCreateWithoutCreditUsageInput>
    connectOrCreate?: UserWalletCreateOrConnectWithoutCreditUsageInput
    upsert?: UserWalletUpsertWithoutCreditUsageInput
    connect?: UserWalletWhereUniqueInput
    update?: XOR<XOR<UserWalletUpdateToOneWithWhereWithoutCreditUsageInput, UserWalletUpdateWithoutCreditUsageInput>, UserWalletUncheckedUpdateWithoutCreditUsageInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    projectMemory?: ProjectMemoryCreateNestedOneWithoutProjectInput
    threads?: ThreadCreateNestedManyWithoutProjectInput
    messages?: MessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    projectMemory?: ProjectMemoryUncheckedCreateNestedOneWithoutProjectInput
    threads?: ThreadUncheckedCreateNestedManyWithoutProjectInput
    messages?: MessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserWalletCreateWithoutUserInput = {
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionPayments?: SubscriptionPaymentCreateNestedManyWithoutWalletInput
    creditUsage?: CreditUsageCreateNestedManyWithoutWalletInput
  }

  export type UserWalletUncheckedCreateWithoutUserInput = {
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedCreateNestedManyWithoutWalletInput
    creditUsage?: CreditUsageUncheckedCreateNestedManyWithoutWalletInput
  }

  export type UserWalletCreateOrConnectWithoutUserInput = {
    where: UserWalletWhereUniqueInput
    create: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type UserWalletUpsertWithoutUserInput = {
    update: XOR<UserWalletUpdateWithoutUserInput, UserWalletUncheckedUpdateWithoutUserInput>
    create: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
    where?: UserWalletWhereInput
  }

  export type UserWalletUpdateToOneWithWhereWithoutUserInput = {
    where?: UserWalletWhereInput
    data: XOR<UserWalletUpdateWithoutUserInput, UserWalletUncheckedUpdateWithoutUserInput>
  }

  export type UserWalletUpdateWithoutUserInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionPayments?: SubscriptionPaymentUpdateManyWithoutWalletNestedInput
    creditUsage?: CreditUsageUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletUncheckedUpdateWithoutUserInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedUpdateManyWithoutWalletNestedInput
    creditUsage?: CreditUsageUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    wallet?: UserWalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    wallet?: UserWalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectMemoryCreateWithoutProjectInput = {
    id?: string
    summary?: string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type ProjectMemoryUncheckedCreateWithoutProjectInput = {
    id?: string
    summary?: string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type ProjectMemoryCreateOrConnectWithoutProjectInput = {
    where: ProjectMemoryWhereUniqueInput
    create: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
  }

  export type ThreadCreateWithoutProjectInput = {
    id?: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutThreadInput
  }

  export type ThreadUncheckedCreateWithoutProjectInput = {
    id?: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutThreadInput
  }

  export type ThreadCreateOrConnectWithoutProjectInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput>
  }

  export type ThreadCreateManyProjectInputEnvelope = {
    data: ThreadCreateManyProjectInput | ThreadCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutProjectInput = {
    id?: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
    thread: ThreadCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutProjectInput = {
    id?: string
    threadId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type MessageCreateOrConnectWithoutProjectInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput>
  }

  export type MessageCreateManyProjectInputEnvelope = {
    data: MessageCreateManyProjectInput | MessageCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: UserWalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: UserWalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ProjectMemoryUpsertWithoutProjectInput = {
    update: XOR<ProjectMemoryUpdateWithoutProjectInput, ProjectMemoryUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMemoryCreateWithoutProjectInput, ProjectMemoryUncheckedCreateWithoutProjectInput>
    where?: ProjectMemoryWhereInput
  }

  export type ProjectMemoryUpdateToOneWithWhereWithoutProjectInput = {
    where?: ProjectMemoryWhereInput
    data: XOR<ProjectMemoryUpdateWithoutProjectInput, ProjectMemoryUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMemoryUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemoryUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    facts?: JsonNullValueInput | InputJsonValue
    decisions?: JsonNullValueInput | InputJsonValue
    openQuestions?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadUpsertWithWhereUniqueWithoutProjectInput = {
    where: ThreadWhereUniqueInput
    update: XOR<ThreadUpdateWithoutProjectInput, ThreadUncheckedUpdateWithoutProjectInput>
    create: XOR<ThreadCreateWithoutProjectInput, ThreadUncheckedCreateWithoutProjectInput>
  }

  export type ThreadUpdateWithWhereUniqueWithoutProjectInput = {
    where: ThreadWhereUniqueInput
    data: XOR<ThreadUpdateWithoutProjectInput, ThreadUncheckedUpdateWithoutProjectInput>
  }

  export type ThreadUpdateManyWithWhereWithoutProjectInput = {
    where: ThreadScalarWhereInput
    data: XOR<ThreadUpdateManyMutationInput, ThreadUncheckedUpdateManyWithoutProjectInput>
  }

  export type ThreadScalarWhereInput = {
    AND?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
    OR?: ThreadScalarWhereInput[]
    NOT?: ThreadScalarWhereInput | ThreadScalarWhereInput[]
    id?: StringFilter<"Thread"> | string
    projectId?: StringFilter<"Thread"> | string
    title?: StringFilter<"Thread"> | string
    mode?: StringFilter<"Thread"> | string
    createdAt?: DateTimeFilter<"Thread"> | Date | string
    updatedAt?: DateTimeFilter<"Thread"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutProjectInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutProjectInput, MessageUncheckedUpdateWithoutProjectInput>
    create: XOR<MessageCreateWithoutProjectInput, MessageUncheckedCreateWithoutProjectInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutProjectInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutProjectInput, MessageUncheckedUpdateWithoutProjectInput>
  }

  export type MessageUpdateManyWithWhereWithoutProjectInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutProjectInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    threadId?: StringFilter<"Message"> | string
    projectId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    modelUsed?: StringNullableFilter<"Message"> | string | null
    turnNumber?: IntFilter<"Message"> | number
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ProjectCreateWithoutProjectMemoryInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    threads?: ThreadCreateNestedManyWithoutProjectInput
    messages?: MessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProjectMemoryInput = {
    id?: string
    userId: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    threads?: ThreadUncheckedCreateNestedManyWithoutProjectInput
    messages?: MessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProjectMemoryInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectMemoryInput, ProjectUncheckedCreateWithoutProjectMemoryInput>
  }

  export type ProjectUpsertWithoutProjectMemoryInput = {
    update: XOR<ProjectUpdateWithoutProjectMemoryInput, ProjectUncheckedUpdateWithoutProjectMemoryInput>
    create: XOR<ProjectCreateWithoutProjectMemoryInput, ProjectUncheckedCreateWithoutProjectMemoryInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectMemoryInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectMemoryInput, ProjectUncheckedUpdateWithoutProjectMemoryInput>
  }

  export type ProjectUpdateWithoutProjectMemoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    threads?: ThreadUpdateManyWithoutProjectNestedInput
    messages?: MessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectMemoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threads?: ThreadUncheckedUpdateManyWithoutProjectNestedInput
    messages?: MessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutThreadsInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    projectMemory?: ProjectMemoryCreateNestedOneWithoutProjectInput
    messages?: MessageCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutThreadsInput = {
    id?: string
    userId: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    projectMemory?: ProjectMemoryUncheckedCreateNestedOneWithoutProjectInput
    messages?: MessageUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutThreadsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutThreadsInput, ProjectUncheckedCreateWithoutThreadsInput>
  }

  export type MessageCreateWithoutThreadInput = {
    id?: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
    project: ProjectCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutThreadInput = {
    id?: string
    projectId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type MessageCreateOrConnectWithoutThreadInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput>
  }

  export type MessageCreateManyThreadInputEnvelope = {
    data: MessageCreateManyThreadInput | MessageCreateManyThreadInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutThreadsInput = {
    update: XOR<ProjectUpdateWithoutThreadsInput, ProjectUncheckedUpdateWithoutThreadsInput>
    create: XOR<ProjectCreateWithoutThreadsInput, ProjectUncheckedCreateWithoutThreadsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutThreadsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutThreadsInput, ProjectUncheckedUpdateWithoutThreadsInput>
  }

  export type ProjectUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    projectMemory?: ProjectMemoryUpdateOneWithoutProjectNestedInput
    messages?: MessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutThreadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMemory?: ProjectMemoryUncheckedUpdateOneWithoutProjectNestedInput
    messages?: MessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutThreadInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutThreadInput, MessageUncheckedUpdateWithoutThreadInput>
    create: XOR<MessageCreateWithoutThreadInput, MessageUncheckedCreateWithoutThreadInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutThreadInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutThreadInput, MessageUncheckedUpdateWithoutThreadInput>
  }

  export type MessageUpdateManyWithWhereWithoutThreadInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutThreadInput>
  }

  export type ThreadCreateWithoutMessagesInput = {
    id?: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutThreadsInput
  }

  export type ThreadUncheckedCreateWithoutMessagesInput = {
    id?: string
    projectId: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type ThreadCreateOrConnectWithoutMessagesInput = {
    where: ThreadWhereUniqueInput
    create: XOR<ThreadCreateWithoutMessagesInput, ThreadUncheckedCreateWithoutMessagesInput>
  }

  export type ProjectCreateWithoutMessagesInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    projectMemory?: ProjectMemoryCreateNestedOneWithoutProjectInput
    threads?: ThreadCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
    projectMemory?: ProjectMemoryUncheckedCreateNestedOneWithoutProjectInput
    threads?: ThreadUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMessagesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMessagesInput, ProjectUncheckedCreateWithoutMessagesInput>
  }

  export type ThreadUpsertWithoutMessagesInput = {
    update: XOR<ThreadUpdateWithoutMessagesInput, ThreadUncheckedUpdateWithoutMessagesInput>
    create: XOR<ThreadCreateWithoutMessagesInput, ThreadUncheckedCreateWithoutMessagesInput>
    where?: ThreadWhereInput
  }

  export type ThreadUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ThreadWhereInput
    data: XOR<ThreadUpdateWithoutMessagesInput, ThreadUncheckedUpdateWithoutMessagesInput>
  }

  export type ThreadUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutThreadsNestedInput
  }

  export type ThreadUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpsertWithoutMessagesInput = {
    update: XOR<ProjectUpdateWithoutMessagesInput, ProjectUncheckedUpdateWithoutMessagesInput>
    create: XOR<ProjectCreateWithoutMessagesInput, ProjectUncheckedCreateWithoutMessagesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMessagesInput, ProjectUncheckedUpdateWithoutMessagesInput>
  }

  export type ProjectUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    projectMemory?: ProjectMemoryUpdateOneWithoutProjectNestedInput
    threads?: ThreadUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMemory?: ProjectMemoryUncheckedUpdateOneWithoutProjectNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutWalletInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id: string
    email: string
    name?: string | null
    photoURL?: string | null
    createdAt: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type SubscriptionPaymentCreateWithoutWalletInput = {
    id?: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type SubscriptionPaymentUncheckedCreateWithoutWalletInput = {
    id?: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type SubscriptionPaymentCreateOrConnectWithoutWalletInput = {
    where: SubscriptionPaymentWhereUniqueInput
    create: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput>
  }

  export type SubscriptionPaymentCreateManyWalletInputEnvelope = {
    data: SubscriptionPaymentCreateManyWalletInput | SubscriptionPaymentCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type CreditUsageCreateWithoutWalletInput = {
    id?: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type CreditUsageUncheckedCreateWithoutWalletInput = {
    id?: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type CreditUsageCreateOrConnectWithoutWalletInput = {
    where: CreditUsageWhereUniqueInput
    create: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput>
  }

  export type CreditUsageCreateManyWalletInputEnvelope = {
    data: CreditUsageCreateManyWalletInput | CreditUsageCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    photoURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubscriptionPaymentUpsertWithWhereUniqueWithoutWalletInput = {
    where: SubscriptionPaymentWhereUniqueInput
    update: XOR<SubscriptionPaymentUpdateWithoutWalletInput, SubscriptionPaymentUncheckedUpdateWithoutWalletInput>
    create: XOR<SubscriptionPaymentCreateWithoutWalletInput, SubscriptionPaymentUncheckedCreateWithoutWalletInput>
  }

  export type SubscriptionPaymentUpdateWithWhereUniqueWithoutWalletInput = {
    where: SubscriptionPaymentWhereUniqueInput
    data: XOR<SubscriptionPaymentUpdateWithoutWalletInput, SubscriptionPaymentUncheckedUpdateWithoutWalletInput>
  }

  export type SubscriptionPaymentUpdateManyWithWhereWithoutWalletInput = {
    where: SubscriptionPaymentScalarWhereInput
    data: XOR<SubscriptionPaymentUpdateManyMutationInput, SubscriptionPaymentUncheckedUpdateManyWithoutWalletInput>
  }

  export type SubscriptionPaymentScalarWhereInput = {
    AND?: SubscriptionPaymentScalarWhereInput | SubscriptionPaymentScalarWhereInput[]
    OR?: SubscriptionPaymentScalarWhereInput[]
    NOT?: SubscriptionPaymentScalarWhereInput | SubscriptionPaymentScalarWhereInput[]
    id?: StringFilter<"SubscriptionPayment"> | string
    userId?: StringFilter<"SubscriptionPayment"> | string
    paymentProvider?: StringFilter<"SubscriptionPayment"> | string
    paymentProviderId?: StringFilter<"SubscriptionPayment"> | string
    amountPaidCents?: IntFilter<"SubscriptionPayment"> | number
    currency?: StringFilter<"SubscriptionPayment"> | string
    grantMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceBeforeMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"SubscriptionPayment"> | bigint | number
    createdAt?: DateTimeFilter<"SubscriptionPayment"> | Date | string
  }

  export type CreditUsageUpsertWithWhereUniqueWithoutWalletInput = {
    where: CreditUsageWhereUniqueInput
    update: XOR<CreditUsageUpdateWithoutWalletInput, CreditUsageUncheckedUpdateWithoutWalletInput>
    create: XOR<CreditUsageCreateWithoutWalletInput, CreditUsageUncheckedCreateWithoutWalletInput>
  }

  export type CreditUsageUpdateWithWhereUniqueWithoutWalletInput = {
    where: CreditUsageWhereUniqueInput
    data: XOR<CreditUsageUpdateWithoutWalletInput, CreditUsageUncheckedUpdateWithoutWalletInput>
  }

  export type CreditUsageUpdateManyWithWhereWithoutWalletInput = {
    where: CreditUsageScalarWhereInput
    data: XOR<CreditUsageUpdateManyMutationInput, CreditUsageUncheckedUpdateManyWithoutWalletInput>
  }

  export type CreditUsageScalarWhereInput = {
    AND?: CreditUsageScalarWhereInput | CreditUsageScalarWhereInput[]
    OR?: CreditUsageScalarWhereInput[]
    NOT?: CreditUsageScalarWhereInput | CreditUsageScalarWhereInput[]
    id?: StringFilter<"CreditUsage"> | string
    userId?: StringFilter<"CreditUsage"> | string
    requestId?: StringFilter<"CreditUsage"> | string
    openrouterGenerationId?: StringNullableFilter<"CreditUsage"> | string | null
    modelUsed?: StringNullableFilter<"CreditUsage"> | string | null
    activityType?: StringFilter<"CreditUsage"> | string
    costMicrousd?: BigIntFilter<"CreditUsage"> | bigint | number
    debitMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    tokenUsage?: JsonNullableFilter<"CreditUsage">
    balanceBeforeMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    balanceAfterMicrocredits?: BigIntFilter<"CreditUsage"> | bigint | number
    createdAt?: DateTimeFilter<"CreditUsage"> | Date | string
  }

  export type UserWalletCreateWithoutSubscriptionPaymentsInput = {
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
    creditUsage?: CreditUsageCreateNestedManyWithoutWalletInput
  }

  export type UserWalletUncheckedCreateWithoutSubscriptionPaymentsInput = {
    userId: string
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    creditUsage?: CreditUsageUncheckedCreateNestedManyWithoutWalletInput
  }

  export type UserWalletCreateOrConnectWithoutSubscriptionPaymentsInput = {
    where: UserWalletWhereUniqueInput
    create: XOR<UserWalletCreateWithoutSubscriptionPaymentsInput, UserWalletUncheckedCreateWithoutSubscriptionPaymentsInput>
  }

  export type UserWalletUpsertWithoutSubscriptionPaymentsInput = {
    update: XOR<UserWalletUpdateWithoutSubscriptionPaymentsInput, UserWalletUncheckedUpdateWithoutSubscriptionPaymentsInput>
    create: XOR<UserWalletCreateWithoutSubscriptionPaymentsInput, UserWalletUncheckedCreateWithoutSubscriptionPaymentsInput>
    where?: UserWalletWhereInput
  }

  export type UserWalletUpdateToOneWithWhereWithoutSubscriptionPaymentsInput = {
    where?: UserWalletWhereInput
    data: XOR<UserWalletUpdateWithoutSubscriptionPaymentsInput, UserWalletUncheckedUpdateWithoutSubscriptionPaymentsInput>
  }

  export type UserWalletUpdateWithoutSubscriptionPaymentsInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    creditUsage?: CreditUsageUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletUncheckedUpdateWithoutSubscriptionPaymentsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditUsage?: CreditUsageUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletCreateWithoutCreditUsageInput = {
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletInput
    subscriptionPayments?: SubscriptionPaymentCreateNestedManyWithoutWalletInput
  }

  export type UserWalletUncheckedCreateWithoutCreditUsageInput = {
    userId: string
    balanceMicrocredits?: bigint | number
    subscriptionStatus?: string
    currentPeriodEnd?: Date | string | null
    capMicrocredits?: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedCreateNestedManyWithoutWalletInput
  }

  export type UserWalletCreateOrConnectWithoutCreditUsageInput = {
    where: UserWalletWhereUniqueInput
    create: XOR<UserWalletCreateWithoutCreditUsageInput, UserWalletUncheckedCreateWithoutCreditUsageInput>
  }

  export type UserWalletUpsertWithoutCreditUsageInput = {
    update: XOR<UserWalletUpdateWithoutCreditUsageInput, UserWalletUncheckedUpdateWithoutCreditUsageInput>
    create: XOR<UserWalletCreateWithoutCreditUsageInput, UserWalletUncheckedCreateWithoutCreditUsageInput>
    where?: UserWalletWhereInput
  }

  export type UserWalletUpdateToOneWithWhereWithoutCreditUsageInput = {
    where?: UserWalletWhereInput
    data: XOR<UserWalletUpdateWithoutCreditUsageInput, UserWalletUncheckedUpdateWithoutCreditUsageInput>
  }

  export type UserWalletUpdateWithoutCreditUsageInput = {
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    subscriptionPayments?: SubscriptionPaymentUpdateManyWithoutWalletNestedInput
  }

  export type UserWalletUncheckedUpdateWithoutCreditUsageInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balanceMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptionPayments?: SubscriptionPaymentUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMemory?: ProjectMemoryUpdateOneWithoutProjectNestedInput
    threads?: ThreadUpdateManyWithoutProjectNestedInput
    messages?: MessageUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectMemory?: ProjectMemoryUncheckedUpdateOneWithoutProjectNestedInput
    threads?: ThreadUncheckedUpdateManyWithoutProjectNestedInput
    messages?: MessageUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThreadCreateManyProjectInput = {
    id?: string
    title: string
    mode?: string
    createdAt: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyProjectInput = {
    id?: string
    threadId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type ThreadUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutThreadNestedInput
  }

  export type ThreadUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thread?: ThreadUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyThreadInput = {
    id?: string
    projectId: string
    role: string
    content: string
    modelUsed?: string | null
    turnNumber?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type MessageUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutThreadInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    turnNumber?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentCreateManyWalletInput = {
    id?: string
    paymentProvider: string
    paymentProviderId: string
    amountPaidCents: number
    currency?: string
    grantMicrocredits: bigint | number
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type CreditUsageCreateManyWalletInput = {
    id?: string
    requestId: string
    openrouterGenerationId?: string | null
    modelUsed?: string | null
    activityType: string
    costMicrousd: bigint | number
    debitMicrocredits: bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits: bigint | number
    balanceAfterMicrocredits: bigint | number
    createdAt?: Date | string
  }

  export type SubscriptionPaymentUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionPaymentUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentProvider?: StringFieldUpdateOperationsInput | string
    paymentProviderId?: StringFieldUpdateOperationsInput | string
    amountPaidCents?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    grantMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditUsageUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    openrouterGenerationId?: NullableStringFieldUpdateOperationsInput | string | null
    modelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    activityType?: StringFieldUpdateOperationsInput | string
    costMicrousd?: BigIntFieldUpdateOperationsInput | bigint | number
    debitMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    tokenUsage?: NullableJsonNullValueInput | InputJsonValue
    balanceBeforeMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    balanceAfterMicrocredits?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}