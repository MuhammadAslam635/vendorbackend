
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AccessToken
 * 
 */
export type AccessToken = $Result.DefaultSelection<Prisma.$AccessTokenPayload>
/**
 * Model VendorProfile
 * 
 */
export type VendorProfile = $Result.DefaultSelection<Prisma.$VendorProfilePayload>
/**
 * Model Package
 * 
 */
export type Package = $Result.DefaultSelection<Prisma.$PackagePayload>
/**
 * Model SubscribePackage
 * 
 */
export type SubscribePackage = $Result.DefaultSelection<Prisma.$SubscribePackagePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  VENDOR: 'VENDOR',
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const UserStatus: {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  BLOCKED: 'BLOCKED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const PackageStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type PackageStatus = (typeof PackageStatus)[keyof typeof PackageStatus]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type PackageStatus = $Enums.PackageStatus

export const PackageStatus: typeof $Enums.PackageStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessToken`: Exposes CRUD operations for the **AccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessTokens
    * const accessTokens = await prisma.accessToken.findMany()
    * ```
    */
  get accessToken(): Prisma.AccessTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendorProfile`: Exposes CRUD operations for the **VendorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorProfiles
    * const vendorProfiles = await prisma.vendorProfile.findMany()
    * ```
    */
  get vendorProfile(): Prisma.VendorProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscribePackage`: Exposes CRUD operations for the **SubscribePackage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscribePackages
    * const subscribePackages = await prisma.subscribePackage.findMany()
    * ```
    */
  get subscribePackage(): Prisma.SubscribePackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    User: 'User',
    AccessToken: 'AccessToken',
    VendorProfile: 'VendorProfile',
    Package: 'Package',
    SubscribePackage: 'SubscribePackage',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "accessToken" | "vendorProfile" | "package" | "subscribePackage" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      AccessToken: {
        payload: Prisma.$AccessTokenPayload<ExtArgs>
        fields: Prisma.AccessTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          findFirst: {
            args: Prisma.AccessTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          findMany: {
            args: Prisma.AccessTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>[]
          }
          create: {
            args: Prisma.AccessTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          createMany: {
            args: Prisma.AccessTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>[]
          }
          delete: {
            args: Prisma.AccessTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          update: {
            args: Prisma.AccessTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          deleteMany: {
            args: Prisma.AccessTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>[]
          }
          upsert: {
            args: Prisma.AccessTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessTokenPayload>
          }
          aggregate: {
            args: Prisma.AccessTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessToken>
          }
          groupBy: {
            args: Prisma.AccessTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessTokenCountArgs<ExtArgs>
            result: $Utils.Optional<AccessTokenCountAggregateOutputType> | number
          }
        }
      }
      VendorProfile: {
        payload: Prisma.$VendorProfilePayload<ExtArgs>
        fields: Prisma.VendorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          findFirst: {
            args: Prisma.VendorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          findMany: {
            args: Prisma.VendorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>[]
          }
          create: {
            args: Prisma.VendorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          createMany: {
            args: Prisma.VendorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>[]
          }
          delete: {
            args: Prisma.VendorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          update: {
            args: Prisma.VendorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          deleteMany: {
            args: Prisma.VendorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>[]
          }
          upsert: {
            args: Prisma.VendorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          aggregate: {
            args: Prisma.VendorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorProfile>
          }
          groupBy: {
            args: Prisma.VendorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<VendorProfileCountAggregateOutputType> | number
          }
        }
      }
      Package: {
        payload: Prisma.$PackagePayload<ExtArgs>
        fields: Prisma.PackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      SubscribePackage: {
        payload: Prisma.$SubscribePackagePayload<ExtArgs>
        fields: Prisma.SubscribePackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscribePackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscribePackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          findFirst: {
            args: Prisma.SubscribePackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscribePackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          findMany: {
            args: Prisma.SubscribePackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>[]
          }
          create: {
            args: Prisma.SubscribePackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          createMany: {
            args: Prisma.SubscribePackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscribePackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>[]
          }
          delete: {
            args: Prisma.SubscribePackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          update: {
            args: Prisma.SubscribePackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          deleteMany: {
            args: Prisma.SubscribePackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscribePackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscribePackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>[]
          }
          upsert: {
            args: Prisma.SubscribePackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscribePackagePayload>
          }
          aggregate: {
            args: Prisma.SubscribePackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscribePackage>
          }
          groupBy: {
            args: Prisma.SubscribePackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscribePackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscribePackageCountArgs<ExtArgs>
            result: $Utils.Optional<SubscribePackageCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    accessToken?: AccessTokenOmit
    vendorProfile?: VendorProfileOmit
    package?: PackageOmit
    subscribePackage?: SubscribePackageOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    profiles: number
    access_tokens: number
    subscribe_packages: number
    transactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | UserCountOutputTypeCountProfilesArgs
    access_tokens?: boolean | UserCountOutputTypeCountAccess_tokensArgs
    subscribe_packages?: boolean | UserCountOutputTypeCountSubscribe_packagesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
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
  export type UserCountOutputTypeCountProfilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorProfileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccess_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubscribe_packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscribePackageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type PackageCountOutputType
   */

  export type PackageCountOutputType = {
    subscribe_packages: number
  }

  export type PackageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscribe_packages?: boolean | PackageCountOutputTypeCountSubscribe_packagesArgs
  }

  // Custom InputTypes
  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageCountOutputType
     */
    select?: PackageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PackageCountOutputType without action
   */
  export type PackageCountOutputTypeCountSubscribe_packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscribePackageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    totalProfiles: number | null
    activeProfiles: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    totalProfiles: number | null
    activeProfiles: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    email_verification_at: Date | null
    utype: string | null
    status: string | null
    packageActive: string | null
    totalProfiles: number | null
    activeProfiles: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    email_verification_at: Date | null
    utype: string | null
    status: string | null
    packageActive: string | null
    totalProfiles: number | null
    activeProfiles: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    email_verification_at: number
    utype: number
    status: number
    packageActive: number
    totalProfiles: number
    activeProfiles: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    totalProfiles?: true
    activeProfiles?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    totalProfiles?: true
    activeProfiles?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    email_verification_at?: true
    utype?: true
    status?: true
    packageActive?: true
    totalProfiles?: true
    activeProfiles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    email_verification_at?: true
    utype?: true
    status?: true
    packageActive?: true
    totalProfiles?: true
    activeProfiles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    email_verification_at?: true
    utype?: true
    status?: true
    packageActive?: true
    totalProfiles?: true
    activeProfiles?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    email_verification_at: Date | null
    utype: string
    status: string
    packageActive: string
    totalProfiles: number | null
    activeProfiles: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    password?: boolean
    email_verification_at?: boolean
    utype?: boolean
    status?: boolean
    packageActive?: boolean
    totalProfiles?: boolean
    activeProfiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profiles?: boolean | User$profilesArgs<ExtArgs>
    access_tokens?: boolean | User$access_tokensArgs<ExtArgs>
    subscribe_packages?: boolean | User$subscribe_packagesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    email_verification_at?: boolean
    utype?: boolean
    status?: boolean
    packageActive?: boolean
    totalProfiles?: boolean
    activeProfiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    email_verification_at?: boolean
    utype?: boolean
    status?: boolean
    packageActive?: boolean
    totalProfiles?: boolean
    activeProfiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    email_verification_at?: boolean
    utype?: boolean
    status?: boolean
    packageActive?: boolean
    totalProfiles?: boolean
    activeProfiles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "email_verification_at" | "utype" | "status" | "packageActive" | "totalProfiles" | "activeProfiles" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profiles?: boolean | User$profilesArgs<ExtArgs>
    access_tokens?: boolean | User$access_tokensArgs<ExtArgs>
    subscribe_packages?: boolean | User$subscribe_packagesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profiles: Prisma.$VendorProfilePayload<ExtArgs>[]
      access_tokens: Prisma.$AccessTokenPayload<ExtArgs>[]
      subscribe_packages: Prisma.$SubscribePackagePayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      email_verification_at: Date | null
      utype: string
      status: string
      packageActive: string
      totalProfiles: number | null
      activeProfiles: number | null
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
    profiles<T extends User$profilesArgs<ExtArgs> = {}>(args?: Subset<T, User$profilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    access_tokens<T extends User$access_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$access_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscribe_packages<T extends User$subscribe_packagesArgs<ExtArgs> = {}>(args?: Subset<T, User$subscribe_packagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly email_verification_at: FieldRef<"User", 'DateTime'>
    readonly utype: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly packageActive: FieldRef<"User", 'String'>
    readonly totalProfiles: FieldRef<"User", 'Int'>
    readonly activeProfiles: FieldRef<"User", 'Int'>
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
   * User.profiles
   */
  export type User$profilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    where?: VendorProfileWhereInput
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    cursor?: VendorProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * User.access_tokens
   */
  export type User$access_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    where?: AccessTokenWhereInput
    orderBy?: AccessTokenOrderByWithRelationInput | AccessTokenOrderByWithRelationInput[]
    cursor?: AccessTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessTokenScalarFieldEnum | AccessTokenScalarFieldEnum[]
  }

  /**
   * User.subscribe_packages
   */
  export type User$subscribe_packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    where?: SubscribePackageWhereInput
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    cursor?: SubscribePackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscribePackageScalarFieldEnum | SubscribePackageScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
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
   * Model AccessToken
   */

  export type AggregateAccessToken = {
    _count: AccessTokenCountAggregateOutputType | null
    _avg: AccessTokenAvgAggregateOutputType | null
    _sum: AccessTokenSumAggregateOutputType | null
    _min: AccessTokenMinAggregateOutputType | null
    _max: AccessTokenMaxAggregateOutputType | null
  }

  export type AccessTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AccessTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AccessTokenMinAggregateOutputType = {
    id: number | null
    access_token: string | null
    refresh_token: string | null
    expires_at: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessTokenMaxAggregateOutputType = {
    id: number | null
    access_token: string | null
    refresh_token: string | null
    expires_at: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccessTokenCountAggregateOutputType = {
    id: number
    access_token: number
    refresh_token: number
    expires_at: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccessTokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AccessTokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AccessTokenMinAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessTokenMaxAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccessTokenCountAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expires_at?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccessTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessToken to aggregate.
     */
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     */
    orderBy?: AccessTokenOrderByWithRelationInput | AccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessTokens
    **/
    _count?: true | AccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessTokenMaxAggregateInputType
  }

  export type GetAccessTokenAggregateType<T extends AccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessToken[P]>
      : GetScalarType<T[P], AggregateAccessToken[P]>
  }




  export type AccessTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessTokenWhereInput
    orderBy?: AccessTokenOrderByWithAggregationInput | AccessTokenOrderByWithAggregationInput[]
    by: AccessTokenScalarFieldEnum[] | AccessTokenScalarFieldEnum
    having?: AccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessTokenCountAggregateInputType | true
    _avg?: AccessTokenAvgAggregateInputType
    _sum?: AccessTokenSumAggregateInputType
    _min?: AccessTokenMinAggregateInputType
    _max?: AccessTokenMaxAggregateInputType
  }

  export type AccessTokenGroupByOutputType = {
    id: number
    access_token: string
    refresh_token: string | null
    expires_at: Date
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: AccessTokenCountAggregateOutputType | null
    _avg: AccessTokenAvgAggregateOutputType | null
    _sum: AccessTokenSumAggregateOutputType | null
    _min: AccessTokenMinAggregateOutputType | null
    _max: AccessTokenMaxAggregateOutputType | null
  }

  type GetAccessTokenGroupByPayload<T extends AccessTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], AccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type AccessTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessToken"]>

  export type AccessTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessToken"]>

  export type AccessTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accessToken"]>

  export type AccessTokenSelectScalar = {
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expires_at?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccessTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "access_token" | "refresh_token" | "expires_at" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["accessToken"]>
  export type AccessTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccessTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccessTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccessTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      access_token: string
      refresh_token: string | null
      expires_at: Date
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["accessToken"]>
    composites: {}
  }

  type AccessTokenGetPayload<S extends boolean | null | undefined | AccessTokenDefaultArgs> = $Result.GetResult<Prisma.$AccessTokenPayload, S>

  type AccessTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessTokenCountAggregateInputType | true
    }

  export interface AccessTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessToken'], meta: { name: 'AccessToken' } }
    /**
     * Find zero or one AccessToken that matches the filter.
     * @param {AccessTokenFindUniqueArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessTokenFindUniqueArgs>(args: SelectSubset<T, AccessTokenFindUniqueArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessTokenFindUniqueOrThrowArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindFirstArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessTokenFindFirstArgs>(args?: SelectSubset<T, AccessTokenFindFirstArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindFirstOrThrowArgs} args - Arguments to find a AccessToken
     * @example
     * // Get one AccessToken
     * const accessToken = await prisma.accessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessTokens
     * const accessTokens = await prisma.accessToken.findMany()
     * 
     * // Get first 10 AccessTokens
     * const accessTokens = await prisma.accessToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessTokenWithIdOnly = await prisma.accessToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessTokenFindManyArgs>(args?: SelectSubset<T, AccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessToken.
     * @param {AccessTokenCreateArgs} args - Arguments to create a AccessToken.
     * @example
     * // Create one AccessToken
     * const AccessToken = await prisma.accessToken.create({
     *   data: {
     *     // ... data to create a AccessToken
     *   }
     * })
     * 
     */
    create<T extends AccessTokenCreateArgs>(args: SelectSubset<T, AccessTokenCreateArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessTokens.
     * @param {AccessTokenCreateManyArgs} args - Arguments to create many AccessTokens.
     * @example
     * // Create many AccessTokens
     * const accessToken = await prisma.accessToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessTokenCreateManyArgs>(args?: SelectSubset<T, AccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessTokens and returns the data saved in the database.
     * @param {AccessTokenCreateManyAndReturnArgs} args - Arguments to create many AccessTokens.
     * @example
     * // Create many AccessTokens
     * const accessToken = await prisma.accessToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessTokens and only return the `id`
     * const accessTokenWithIdOnly = await prisma.accessToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessToken.
     * @param {AccessTokenDeleteArgs} args - Arguments to delete one AccessToken.
     * @example
     * // Delete one AccessToken
     * const AccessToken = await prisma.accessToken.delete({
     *   where: {
     *     // ... filter to delete one AccessToken
     *   }
     * })
     * 
     */
    delete<T extends AccessTokenDeleteArgs>(args: SelectSubset<T, AccessTokenDeleteArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessToken.
     * @param {AccessTokenUpdateArgs} args - Arguments to update one AccessToken.
     * @example
     * // Update one AccessToken
     * const accessToken = await prisma.accessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessTokenUpdateArgs>(args: SelectSubset<T, AccessTokenUpdateArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessTokens.
     * @param {AccessTokenDeleteManyArgs} args - Arguments to filter AccessTokens to delete.
     * @example
     * // Delete a few AccessTokens
     * const { count } = await prisma.accessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessTokenDeleteManyArgs>(args?: SelectSubset<T, AccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessTokens
     * const accessToken = await prisma.accessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessTokenUpdateManyArgs>(args: SelectSubset<T, AccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessTokens and returns the data updated in the database.
     * @param {AccessTokenUpdateManyAndReturnArgs} args - Arguments to update many AccessTokens.
     * @example
     * // Update many AccessTokens
     * const accessToken = await prisma.accessToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessTokens and only return the `id`
     * const accessTokenWithIdOnly = await prisma.accessToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccessTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessToken.
     * @param {AccessTokenUpsertArgs} args - Arguments to update or create a AccessToken.
     * @example
     * // Update or create a AccessToken
     * const accessToken = await prisma.accessToken.upsert({
     *   create: {
     *     // ... data to create a AccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessToken we want to update
     *   }
     * })
     */
    upsert<T extends AccessTokenUpsertArgs>(args: SelectSubset<T, AccessTokenUpsertArgs<ExtArgs>>): Prisma__AccessTokenClient<$Result.GetResult<Prisma.$AccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenCountArgs} args - Arguments to filter AccessTokens to count.
     * @example
     * // Count the number of AccessTokens
     * const count = await prisma.accessToken.count({
     *   where: {
     *     // ... the filter for the AccessTokens we want to count
     *   }
     * })
    **/
    count<T extends AccessTokenCountArgs>(
      args?: Subset<T, AccessTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccessTokenAggregateArgs>(args: Subset<T, AccessTokenAggregateArgs>): Prisma.PrismaPromise<GetAccessTokenAggregateType<T>>

    /**
     * Group by AccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessTokenGroupByArgs} args - Group by arguments.
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
      T extends AccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: AccessTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessToken model
   */
  readonly fields: AccessTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AccessToken model
   */
  interface AccessTokenFieldRefs {
    readonly id: FieldRef<"AccessToken", 'Int'>
    readonly access_token: FieldRef<"AccessToken", 'String'>
    readonly refresh_token: FieldRef<"AccessToken", 'String'>
    readonly expires_at: FieldRef<"AccessToken", 'DateTime'>
    readonly userId: FieldRef<"AccessToken", 'Int'>
    readonly createdAt: FieldRef<"AccessToken", 'DateTime'>
    readonly updatedAt: FieldRef<"AccessToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccessToken findUnique
   */
  export type AccessTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which AccessToken to fetch.
     */
    where: AccessTokenWhereUniqueInput
  }

  /**
   * AccessToken findUniqueOrThrow
   */
  export type AccessTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which AccessToken to fetch.
     */
    where: AccessTokenWhereUniqueInput
  }

  /**
   * AccessToken findFirst
   */
  export type AccessTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which AccessToken to fetch.
     */
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     */
    orderBy?: AccessTokenOrderByWithRelationInput | AccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessTokens.
     */
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessTokens.
     */
    distinct?: AccessTokenScalarFieldEnum | AccessTokenScalarFieldEnum[]
  }

  /**
   * AccessToken findFirstOrThrow
   */
  export type AccessTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which AccessToken to fetch.
     */
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     */
    orderBy?: AccessTokenOrderByWithRelationInput | AccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessTokens.
     */
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessTokens.
     */
    distinct?: AccessTokenScalarFieldEnum | AccessTokenScalarFieldEnum[]
  }

  /**
   * AccessToken findMany
   */
  export type AccessTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which AccessTokens to fetch.
     */
    where?: AccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessTokens to fetch.
     */
    orderBy?: AccessTokenOrderByWithRelationInput | AccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessTokens.
     */
    cursor?: AccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessTokens.
     */
    skip?: number
    distinct?: AccessTokenScalarFieldEnum | AccessTokenScalarFieldEnum[]
  }

  /**
   * AccessToken create
   */
  export type AccessTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessToken.
     */
    data: XOR<AccessTokenCreateInput, AccessTokenUncheckedCreateInput>
  }

  /**
   * AccessToken createMany
   */
  export type AccessTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessTokens.
     */
    data: AccessTokenCreateManyInput | AccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessToken createManyAndReturn
   */
  export type AccessTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * The data used to create many AccessTokens.
     */
    data: AccessTokenCreateManyInput | AccessTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessToken update
   */
  export type AccessTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessToken.
     */
    data: XOR<AccessTokenUpdateInput, AccessTokenUncheckedUpdateInput>
    /**
     * Choose, which AccessToken to update.
     */
    where: AccessTokenWhereUniqueInput
  }

  /**
   * AccessToken updateMany
   */
  export type AccessTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessTokens.
     */
    data: XOR<AccessTokenUpdateManyMutationInput, AccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which AccessTokens to update
     */
    where?: AccessTokenWhereInput
    /**
     * Limit how many AccessTokens to update.
     */
    limit?: number
  }

  /**
   * AccessToken updateManyAndReturn
   */
  export type AccessTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * The data used to update AccessTokens.
     */
    data: XOR<AccessTokenUpdateManyMutationInput, AccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which AccessTokens to update
     */
    where?: AccessTokenWhereInput
    /**
     * Limit how many AccessTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessToken upsert
   */
  export type AccessTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessToken to update in case it exists.
     */
    where: AccessTokenWhereUniqueInput
    /**
     * In case the AccessToken found by the `where` argument doesn't exist, create a new AccessToken with this data.
     */
    create: XOR<AccessTokenCreateInput, AccessTokenUncheckedCreateInput>
    /**
     * In case the AccessToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessTokenUpdateInput, AccessTokenUncheckedUpdateInput>
  }

  /**
   * AccessToken delete
   */
  export type AccessTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
    /**
     * Filter which AccessToken to delete.
     */
    where: AccessTokenWhereUniqueInput
  }

  /**
   * AccessToken deleteMany
   */
  export type AccessTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessTokens to delete
     */
    where?: AccessTokenWhereInput
    /**
     * Limit how many AccessTokens to delete.
     */
    limit?: number
  }

  /**
   * AccessToken without action
   */
  export type AccessTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessToken
     */
    select?: AccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessToken
     */
    omit?: AccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessTokenInclude<ExtArgs> | null
  }


  /**
   * Model VendorProfile
   */

  export type AggregateVendorProfile = {
    _count: VendorProfileCountAggregateOutputType | null
    _avg: VendorProfileAvgAggregateOutputType | null
    _sum: VendorProfileSumAggregateOutputType | null
    _min: VendorProfileMinAggregateOutputType | null
    _max: VendorProfileMaxAggregateOutputType | null
  }

  export type VendorProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type VendorProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type VendorProfileMinAggregateOutputType = {
    id: number | null
    company: string | null
    state: string | null
    city: string | null
    zipcode: string | null
    address: string | null
    country: string | null
    companyLogo: string | null
    fb: string | null
    ln: string | null
    in: string | null
    yt: string | null
    webUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type VendorProfileMaxAggregateOutputType = {
    id: number | null
    company: string | null
    state: string | null
    city: string | null
    zipcode: string | null
    address: string | null
    country: string | null
    companyLogo: string | null
    fb: string | null
    ln: string | null
    in: string | null
    yt: string | null
    webUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type VendorProfileCountAggregateOutputType = {
    id: number
    company: number
    state: number
    city: number
    zipcode: number
    address: number
    country: number
    companyLogo: number
    fb: number
    ln: number
    in: number
    yt: number
    webUrl: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type VendorProfileAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type VendorProfileSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type VendorProfileMinAggregateInputType = {
    id?: true
    company?: true
    state?: true
    city?: true
    zipcode?: true
    address?: true
    country?: true
    companyLogo?: true
    fb?: true
    ln?: true
    in?: true
    yt?: true
    webUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type VendorProfileMaxAggregateInputType = {
    id?: true
    company?: true
    state?: true
    city?: true
    zipcode?: true
    address?: true
    country?: true
    companyLogo?: true
    fb?: true
    ln?: true
    in?: true
    yt?: true
    webUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type VendorProfileCountAggregateInputType = {
    id?: true
    company?: true
    state?: true
    city?: true
    zipcode?: true
    address?: true
    country?: true
    companyLogo?: true
    fb?: true
    ln?: true
    in?: true
    yt?: true
    webUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type VendorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorProfile to aggregate.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorProfiles
    **/
    _count?: true | VendorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorProfileMaxAggregateInputType
  }

  export type GetVendorProfileAggregateType<T extends VendorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorProfile[P]>
      : GetScalarType<T[P], AggregateVendorProfile[P]>
  }




  export type VendorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorProfileWhereInput
    orderBy?: VendorProfileOrderByWithAggregationInput | VendorProfileOrderByWithAggregationInput[]
    by: VendorProfileScalarFieldEnum[] | VendorProfileScalarFieldEnum
    having?: VendorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorProfileCountAggregateInputType | true
    _avg?: VendorProfileAvgAggregateInputType
    _sum?: VendorProfileSumAggregateInputType
    _min?: VendorProfileMinAggregateInputType
    _max?: VendorProfileMaxAggregateInputType
  }

  export type VendorProfileGroupByOutputType = {
    id: number
    company: string | null
    state: string | null
    city: string | null
    zipcode: string | null
    address: string | null
    country: string | null
    companyLogo: string | null
    fb: string | null
    ln: string | null
    in: string | null
    yt: string | null
    webUrl: string | null
    createdAt: Date
    updatedAt: Date
    userId: number
    _count: VendorProfileCountAggregateOutputType | null
    _avg: VendorProfileAvgAggregateOutputType | null
    _sum: VendorProfileSumAggregateOutputType | null
    _min: VendorProfileMinAggregateOutputType | null
    _max: VendorProfileMaxAggregateOutputType | null
  }

  type GetVendorProfileGroupByPayload<T extends VendorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], VendorProfileGroupByOutputType[P]>
        }
      >
    >


  export type VendorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    state?: boolean
    city?: boolean
    zipcode?: boolean
    address?: boolean
    country?: boolean
    companyLogo?: boolean
    fb?: boolean
    ln?: boolean
    in?: boolean
    yt?: boolean
    webUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorProfile"]>

  export type VendorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    state?: boolean
    city?: boolean
    zipcode?: boolean
    address?: boolean
    country?: boolean
    companyLogo?: boolean
    fb?: boolean
    ln?: boolean
    in?: boolean
    yt?: boolean
    webUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorProfile"]>

  export type VendorProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    state?: boolean
    city?: boolean
    zipcode?: boolean
    address?: boolean
    country?: boolean
    companyLogo?: boolean
    fb?: boolean
    ln?: boolean
    in?: boolean
    yt?: boolean
    webUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorProfile"]>

  export type VendorProfileSelectScalar = {
    id?: boolean
    company?: boolean
    state?: boolean
    city?: boolean
    zipcode?: boolean
    address?: boolean
    country?: boolean
    companyLogo?: boolean
    fb?: boolean
    ln?: boolean
    in?: boolean
    yt?: boolean
    webUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type VendorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company" | "state" | "city" | "zipcode" | "address" | "country" | "companyLogo" | "fb" | "ln" | "in" | "yt" | "webUrl" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["vendorProfile"]>
  export type VendorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VendorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VendorProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VendorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      company: string | null
      state: string | null
      city: string | null
      zipcode: string | null
      address: string | null
      country: string | null
      companyLogo: string | null
      fb: string | null
      ln: string | null
      in: string | null
      yt: string | null
      webUrl: string | null
      createdAt: Date
      updatedAt: Date
      userId: number
    }, ExtArgs["result"]["vendorProfile"]>
    composites: {}
  }

  type VendorProfileGetPayload<S extends boolean | null | undefined | VendorProfileDefaultArgs> = $Result.GetResult<Prisma.$VendorProfilePayload, S>

  type VendorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorProfileCountAggregateInputType | true
    }

  export interface VendorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorProfile'], meta: { name: 'VendorProfile' } }
    /**
     * Find zero or one VendorProfile that matches the filter.
     * @param {VendorProfileFindUniqueArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorProfileFindUniqueArgs>(args: SelectSubset<T, VendorProfileFindUniqueArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorProfileFindUniqueOrThrowArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindFirstArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorProfileFindFirstArgs>(args?: SelectSubset<T, VendorProfileFindFirstArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindFirstOrThrowArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorProfiles
     * const vendorProfiles = await prisma.vendorProfile.findMany()
     * 
     * // Get first 10 VendorProfiles
     * const vendorProfiles = await prisma.vendorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorProfileWithIdOnly = await prisma.vendorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorProfileFindManyArgs>(args?: SelectSubset<T, VendorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendorProfile.
     * @param {VendorProfileCreateArgs} args - Arguments to create a VendorProfile.
     * @example
     * // Create one VendorProfile
     * const VendorProfile = await prisma.vendorProfile.create({
     *   data: {
     *     // ... data to create a VendorProfile
     *   }
     * })
     * 
     */
    create<T extends VendorProfileCreateArgs>(args: SelectSubset<T, VendorProfileCreateArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendorProfiles.
     * @param {VendorProfileCreateManyArgs} args - Arguments to create many VendorProfiles.
     * @example
     * // Create many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorProfileCreateManyArgs>(args?: SelectSubset<T, VendorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorProfiles and returns the data saved in the database.
     * @param {VendorProfileCreateManyAndReturnArgs} args - Arguments to create many VendorProfiles.
     * @example
     * // Create many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorProfiles and only return the `id`
     * const vendorProfileWithIdOnly = await prisma.vendorProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendorProfile.
     * @param {VendorProfileDeleteArgs} args - Arguments to delete one VendorProfile.
     * @example
     * // Delete one VendorProfile
     * const VendorProfile = await prisma.vendorProfile.delete({
     *   where: {
     *     // ... filter to delete one VendorProfile
     *   }
     * })
     * 
     */
    delete<T extends VendorProfileDeleteArgs>(args: SelectSubset<T, VendorProfileDeleteArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendorProfile.
     * @param {VendorProfileUpdateArgs} args - Arguments to update one VendorProfile.
     * @example
     * // Update one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorProfileUpdateArgs>(args: SelectSubset<T, VendorProfileUpdateArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendorProfiles.
     * @param {VendorProfileDeleteManyArgs} args - Arguments to filter VendorProfiles to delete.
     * @example
     * // Delete a few VendorProfiles
     * const { count } = await prisma.vendorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorProfileDeleteManyArgs>(args?: SelectSubset<T, VendorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorProfileUpdateManyArgs>(args: SelectSubset<T, VendorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorProfiles and returns the data updated in the database.
     * @param {VendorProfileUpdateManyAndReturnArgs} args - Arguments to update many VendorProfiles.
     * @example
     * // Update many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendorProfiles and only return the `id`
     * const vendorProfileWithIdOnly = await prisma.vendorProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends VendorProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendorProfile.
     * @param {VendorProfileUpsertArgs} args - Arguments to update or create a VendorProfile.
     * @example
     * // Update or create a VendorProfile
     * const vendorProfile = await prisma.vendorProfile.upsert({
     *   create: {
     *     // ... data to create a VendorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorProfile we want to update
     *   }
     * })
     */
    upsert<T extends VendorProfileUpsertArgs>(args: SelectSubset<T, VendorProfileUpsertArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileCountArgs} args - Arguments to filter VendorProfiles to count.
     * @example
     * // Count the number of VendorProfiles
     * const count = await prisma.vendorProfile.count({
     *   where: {
     *     // ... the filter for the VendorProfiles we want to count
     *   }
     * })
    **/
    count<T extends VendorProfileCountArgs>(
      args?: Subset<T, VendorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VendorProfileAggregateArgs>(args: Subset<T, VendorProfileAggregateArgs>): Prisma.PrismaPromise<GetVendorProfileAggregateType<T>>

    /**
     * Group by VendorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileGroupByArgs} args - Group by arguments.
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
      T extends VendorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorProfileGroupByArgs['orderBy'] }
        : { orderBy?: VendorProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VendorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorProfile model
   */
  readonly fields: VendorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the VendorProfile model
   */
  interface VendorProfileFieldRefs {
    readonly id: FieldRef<"VendorProfile", 'Int'>
    readonly company: FieldRef<"VendorProfile", 'String'>
    readonly state: FieldRef<"VendorProfile", 'String'>
    readonly city: FieldRef<"VendorProfile", 'String'>
    readonly zipcode: FieldRef<"VendorProfile", 'String'>
    readonly address: FieldRef<"VendorProfile", 'String'>
    readonly country: FieldRef<"VendorProfile", 'String'>
    readonly companyLogo: FieldRef<"VendorProfile", 'String'>
    readonly fb: FieldRef<"VendorProfile", 'String'>
    readonly ln: FieldRef<"VendorProfile", 'String'>
    readonly in: FieldRef<"VendorProfile", 'String'>
    readonly yt: FieldRef<"VendorProfile", 'String'>
    readonly webUrl: FieldRef<"VendorProfile", 'String'>
    readonly createdAt: FieldRef<"VendorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"VendorProfile", 'DateTime'>
    readonly userId: FieldRef<"VendorProfile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VendorProfile findUnique
   */
  export type VendorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile findUniqueOrThrow
   */
  export type VendorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile findFirst
   */
  export type VendorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorProfiles.
     */
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile findFirstOrThrow
   */
  export type VendorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorProfiles.
     */
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile findMany
   */
  export type VendorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendorProfiles to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile create
   */
  export type VendorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a VendorProfile.
     */
    data: XOR<VendorProfileCreateInput, VendorProfileUncheckedCreateInput>
  }

  /**
   * VendorProfile createMany
   */
  export type VendorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorProfiles.
     */
    data: VendorProfileCreateManyInput | VendorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorProfile createManyAndReturn
   */
  export type VendorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * The data used to create many VendorProfiles.
     */
    data: VendorProfileCreateManyInput | VendorProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorProfile update
   */
  export type VendorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a VendorProfile.
     */
    data: XOR<VendorProfileUpdateInput, VendorProfileUncheckedUpdateInput>
    /**
     * Choose, which VendorProfile to update.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile updateMany
   */
  export type VendorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorProfiles.
     */
    data: XOR<VendorProfileUpdateManyMutationInput, VendorProfileUncheckedUpdateManyInput>
    /**
     * Filter which VendorProfiles to update
     */
    where?: VendorProfileWhereInput
    /**
     * Limit how many VendorProfiles to update.
     */
    limit?: number
  }

  /**
   * VendorProfile updateManyAndReturn
   */
  export type VendorProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * The data used to update VendorProfiles.
     */
    data: XOR<VendorProfileUpdateManyMutationInput, VendorProfileUncheckedUpdateManyInput>
    /**
     * Filter which VendorProfiles to update
     */
    where?: VendorProfileWhereInput
    /**
     * Limit how many VendorProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorProfile upsert
   */
  export type VendorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the VendorProfile to update in case it exists.
     */
    where: VendorProfileWhereUniqueInput
    /**
     * In case the VendorProfile found by the `where` argument doesn't exist, create a new VendorProfile with this data.
     */
    create: XOR<VendorProfileCreateInput, VendorProfileUncheckedCreateInput>
    /**
     * In case the VendorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorProfileUpdateInput, VendorProfileUncheckedUpdateInput>
  }

  /**
   * VendorProfile delete
   */
  export type VendorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
    /**
     * Filter which VendorProfile to delete.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile deleteMany
   */
  export type VendorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorProfiles to delete
     */
    where?: VendorProfileWhereInput
    /**
     * Limit how many VendorProfiles to delete.
     */
    limit?: number
  }

  /**
   * VendorProfile without action
   */
  export type VendorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendorProfile
     */
    omit?: VendorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorProfileInclude<ExtArgs> | null
  }


  /**
   * Model Package
   */

  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageAvgAggregateOutputType = {
    id: number | null
    price: number | null
    duration: number | null
    profiles: number | null
  }

  export type PackageSumAggregateOutputType = {
    id: number | null
    price: number | null
    duration: number | null
    profiles: number | null
  }

  export type PackageMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    duration: number | null
    profiles: number | null
    description: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    duration: number | null
    profiles: number | null
    description: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    name: number
    price: number
    duration: number
    profiles: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PackageAvgAggregateInputType = {
    id?: true
    price?: true
    duration?: true
    profiles?: true
  }

  export type PackageSumAggregateInputType = {
    id?: true
    price?: true
    duration?: true
    profiles?: true
  }

  export type PackageMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    profiles?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    profiles?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    duration?: true
    profiles?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithAggregationInput | PackageOrderByWithAggregationInput[]
    by: PackageScalarFieldEnum[] | PackageScalarFieldEnum
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _avg?: PackageAvgAggregateInputType
    _sum?: PackageSumAggregateInputType
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }

  export type PackageGroupByOutputType = {
    id: number
    name: string | null
    price: number
    duration: number
    profiles: number
    description: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    profiles?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscribe_packages?: boolean | Package$subscribe_packagesArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    profiles?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    profiles?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    duration?: boolean
    profiles?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "duration" | "profiles" | "description" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["package"]>
  export type PackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscribe_packages?: boolean | Package$subscribe_packagesArgs<ExtArgs>
    _count?: boolean | PackageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Package"
    objects: {
      subscribe_packages: Prisma.$SubscribePackagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      price: number
      duration: number
      profiles: number
      description: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["package"]>
    composites: {}
  }

  type PackageGetPayload<S extends boolean | null | undefined | PackageDefaultArgs> = $Result.GetResult<Prisma.$PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageFindUniqueArgs>(args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Package that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageFindFirstArgs>(args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageFindManyArgs>(args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
     */
    create<T extends PackageCreateArgs>(args: SelectSubset<T, PackageCreateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Packages.
     * @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageCreateManyArgs>(args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Packages and returns the data saved in the database.
     * @param {PackageCreateManyAndReturnArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
     */
    delete<T extends PackageDeleteArgs>(args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageUpdateArgs>(args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageDeleteManyArgs>(args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageUpdateManyArgs>(args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages and returns the data updated in the database.
     * @param {PackageUpdateManyAndReturnArgs} args - Arguments to update many Packages.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.updateManyAndReturn({
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
    updateManyAndReturn<T extends PackageUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
     */
    upsert<T extends PackageUpsertArgs>(args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
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
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Package model
   */
  readonly fields: PackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscribe_packages<T extends Package$subscribe_packagesArgs<ExtArgs> = {}>(args?: Subset<T, Package$subscribe_packagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Package model
   */
  interface PackageFieldRefs {
    readonly id: FieldRef<"Package", 'Int'>
    readonly name: FieldRef<"Package", 'String'>
    readonly price: FieldRef<"Package", 'Float'>
    readonly duration: FieldRef<"Package", 'Int'>
    readonly profiles: FieldRef<"Package", 'Int'>
    readonly description: FieldRef<"Package", 'String'>
    readonly status: FieldRef<"Package", 'String'>
    readonly createdAt: FieldRef<"Package", 'DateTime'>
    readonly updatedAt: FieldRef<"Package", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Package findUnique
   */
  export type PackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findFirst
   */
  export type PackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }

  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package createManyAndReturn
   */
  export type PackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package updateManyAndReturn
   */
  export type PackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }

  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to delete.
     */
    limit?: number
  }

  /**
   * Package.subscribe_packages
   */
  export type Package$subscribe_packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    where?: SubscribePackageWhereInput
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    cursor?: SubscribePackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscribePackageScalarFieldEnum | SubscribePackageScalarFieldEnum[]
  }

  /**
   * Package without action
   */
  export type PackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
  }


  /**
   * Model SubscribePackage
   */

  export type AggregateSubscribePackage = {
    _count: SubscribePackageCountAggregateOutputType | null
    _avg: SubscribePackageAvgAggregateOutputType | null
    _sum: SubscribePackageSumAggregateOutputType | null
    _min: SubscribePackageMinAggregateOutputType | null
    _max: SubscribePackageMaxAggregateOutputType | null
  }

  export type SubscribePackageAvgAggregateOutputType = {
    id: number | null
    packageId: number | null
    userId: number | null
  }

  export type SubscribePackageSumAggregateOutputType = {
    id: number | null
    packageId: number | null
    userId: number | null
  }

  export type SubscribePackageMinAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    packageId: number | null
    userId: number | null
  }

  export type SubscribePackageMaxAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    packageId: number | null
    userId: number | null
  }

  export type SubscribePackageCountAggregateOutputType = {
    id: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    packageId: number
    userId: number
    _all: number
  }


  export type SubscribePackageAvgAggregateInputType = {
    id?: true
    packageId?: true
    userId?: true
  }

  export type SubscribePackageSumAggregateInputType = {
    id?: true
    packageId?: true
    userId?: true
  }

  export type SubscribePackageMinAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    packageId?: true
    userId?: true
  }

  export type SubscribePackageMaxAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    packageId?: true
    userId?: true
  }

  export type SubscribePackageCountAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    packageId?: true
    userId?: true
    _all?: true
  }

  export type SubscribePackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscribePackage to aggregate.
     */
    where?: SubscribePackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscribePackages to fetch.
     */
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscribePackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscribePackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscribePackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscribePackages
    **/
    _count?: true | SubscribePackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscribePackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscribePackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscribePackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscribePackageMaxAggregateInputType
  }

  export type GetSubscribePackageAggregateType<T extends SubscribePackageAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscribePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscribePackage[P]>
      : GetScalarType<T[P], AggregateSubscribePackage[P]>
  }




  export type SubscribePackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscribePackageWhereInput
    orderBy?: SubscribePackageOrderByWithAggregationInput | SubscribePackageOrderByWithAggregationInput[]
    by: SubscribePackageScalarFieldEnum[] | SubscribePackageScalarFieldEnum
    having?: SubscribePackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscribePackageCountAggregateInputType | true
    _avg?: SubscribePackageAvgAggregateInputType
    _sum?: SubscribePackageSumAggregateInputType
    _min?: SubscribePackageMinAggregateInputType
    _max?: SubscribePackageMaxAggregateInputType
  }

  export type SubscribePackageGroupByOutputType = {
    id: number
    startDate: Date
    endDate: Date
    status: string
    createdAt: Date
    updatedAt: Date
    packageId: number
    userId: number
    _count: SubscribePackageCountAggregateOutputType | null
    _avg: SubscribePackageAvgAggregateOutputType | null
    _sum: SubscribePackageSumAggregateOutputType | null
    _min: SubscribePackageMinAggregateOutputType | null
    _max: SubscribePackageMaxAggregateOutputType | null
  }

  type GetSubscribePackageGroupByPayload<T extends SubscribePackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscribePackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscribePackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscribePackageGroupByOutputType[P]>
            : GetScalarType<T[P], SubscribePackageGroupByOutputType[P]>
        }
      >
    >


  export type SubscribePackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageId?: boolean
    userId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | SubscribePackage$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["subscribePackage"]>

  export type SubscribePackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageId?: boolean
    userId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscribePackage"]>

  export type SubscribePackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageId?: boolean
    userId?: boolean
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscribePackage"]>

  export type SubscribePackageSelectScalar = {
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    packageId?: boolean
    userId?: boolean
  }

  export type SubscribePackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt" | "packageId" | "userId", ExtArgs["result"]["subscribePackage"]>
  export type SubscribePackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    transaction?: boolean | SubscribePackage$transactionArgs<ExtArgs>
  }
  export type SubscribePackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscribePackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    package?: boolean | PackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscribePackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscribePackage"
    objects: {
      package: Prisma.$PackagePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      startDate: Date
      endDate: Date
      status: string
      createdAt: Date
      updatedAt: Date
      packageId: number
      userId: number
    }, ExtArgs["result"]["subscribePackage"]>
    composites: {}
  }

  type SubscribePackageGetPayload<S extends boolean | null | undefined | SubscribePackageDefaultArgs> = $Result.GetResult<Prisma.$SubscribePackagePayload, S>

  type SubscribePackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscribePackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscribePackageCountAggregateInputType | true
    }

  export interface SubscribePackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscribePackage'], meta: { name: 'SubscribePackage' } }
    /**
     * Find zero or one SubscribePackage that matches the filter.
     * @param {SubscribePackageFindUniqueArgs} args - Arguments to find a SubscribePackage
     * @example
     * // Get one SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscribePackageFindUniqueArgs>(args: SelectSubset<T, SubscribePackageFindUniqueArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscribePackage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscribePackageFindUniqueOrThrowArgs} args - Arguments to find a SubscribePackage
     * @example
     * // Get one SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscribePackageFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscribePackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscribePackage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageFindFirstArgs} args - Arguments to find a SubscribePackage
     * @example
     * // Get one SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscribePackageFindFirstArgs>(args?: SelectSubset<T, SubscribePackageFindFirstArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscribePackage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageFindFirstOrThrowArgs} args - Arguments to find a SubscribePackage
     * @example
     * // Get one SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscribePackageFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscribePackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscribePackages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscribePackages
     * const subscribePackages = await prisma.subscribePackage.findMany()
     * 
     * // Get first 10 SubscribePackages
     * const subscribePackages = await prisma.subscribePackage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscribePackageWithIdOnly = await prisma.subscribePackage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscribePackageFindManyArgs>(args?: SelectSubset<T, SubscribePackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscribePackage.
     * @param {SubscribePackageCreateArgs} args - Arguments to create a SubscribePackage.
     * @example
     * // Create one SubscribePackage
     * const SubscribePackage = await prisma.subscribePackage.create({
     *   data: {
     *     // ... data to create a SubscribePackage
     *   }
     * })
     * 
     */
    create<T extends SubscribePackageCreateArgs>(args: SelectSubset<T, SubscribePackageCreateArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscribePackages.
     * @param {SubscribePackageCreateManyArgs} args - Arguments to create many SubscribePackages.
     * @example
     * // Create many SubscribePackages
     * const subscribePackage = await prisma.subscribePackage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscribePackageCreateManyArgs>(args?: SelectSubset<T, SubscribePackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscribePackages and returns the data saved in the database.
     * @param {SubscribePackageCreateManyAndReturnArgs} args - Arguments to create many SubscribePackages.
     * @example
     * // Create many SubscribePackages
     * const subscribePackage = await prisma.subscribePackage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscribePackages and only return the `id`
     * const subscribePackageWithIdOnly = await prisma.subscribePackage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscribePackageCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscribePackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscribePackage.
     * @param {SubscribePackageDeleteArgs} args - Arguments to delete one SubscribePackage.
     * @example
     * // Delete one SubscribePackage
     * const SubscribePackage = await prisma.subscribePackage.delete({
     *   where: {
     *     // ... filter to delete one SubscribePackage
     *   }
     * })
     * 
     */
    delete<T extends SubscribePackageDeleteArgs>(args: SelectSubset<T, SubscribePackageDeleteArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscribePackage.
     * @param {SubscribePackageUpdateArgs} args - Arguments to update one SubscribePackage.
     * @example
     * // Update one SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscribePackageUpdateArgs>(args: SelectSubset<T, SubscribePackageUpdateArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscribePackages.
     * @param {SubscribePackageDeleteManyArgs} args - Arguments to filter SubscribePackages to delete.
     * @example
     * // Delete a few SubscribePackages
     * const { count } = await prisma.subscribePackage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscribePackageDeleteManyArgs>(args?: SelectSubset<T, SubscribePackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscribePackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscribePackages
     * const subscribePackage = await prisma.subscribePackage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscribePackageUpdateManyArgs>(args: SelectSubset<T, SubscribePackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscribePackages and returns the data updated in the database.
     * @param {SubscribePackageUpdateManyAndReturnArgs} args - Arguments to update many SubscribePackages.
     * @example
     * // Update many SubscribePackages
     * const subscribePackage = await prisma.subscribePackage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscribePackages and only return the `id`
     * const subscribePackageWithIdOnly = await prisma.subscribePackage.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubscribePackageUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscribePackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscribePackage.
     * @param {SubscribePackageUpsertArgs} args - Arguments to update or create a SubscribePackage.
     * @example
     * // Update or create a SubscribePackage
     * const subscribePackage = await prisma.subscribePackage.upsert({
     *   create: {
     *     // ... data to create a SubscribePackage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscribePackage we want to update
     *   }
     * })
     */
    upsert<T extends SubscribePackageUpsertArgs>(args: SelectSubset<T, SubscribePackageUpsertArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscribePackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageCountArgs} args - Arguments to filter SubscribePackages to count.
     * @example
     * // Count the number of SubscribePackages
     * const count = await prisma.subscribePackage.count({
     *   where: {
     *     // ... the filter for the SubscribePackages we want to count
     *   }
     * })
    **/
    count<T extends SubscribePackageCountArgs>(
      args?: Subset<T, SubscribePackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscribePackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscribePackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubscribePackageAggregateArgs>(args: Subset<T, SubscribePackageAggregateArgs>): Prisma.PrismaPromise<GetSubscribePackageAggregateType<T>>

    /**
     * Group by SubscribePackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribePackageGroupByArgs} args - Group by arguments.
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
      T extends SubscribePackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscribePackageGroupByArgs['orderBy'] }
        : { orderBy?: SubscribePackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubscribePackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscribePackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscribePackage model
   */
  readonly fields: SubscribePackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscribePackage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscribePackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    package<T extends PackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PackageDefaultArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends SubscribePackage$transactionArgs<ExtArgs> = {}>(args?: Subset<T, SubscribePackage$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SubscribePackage model
   */
  interface SubscribePackageFieldRefs {
    readonly id: FieldRef<"SubscribePackage", 'Int'>
    readonly startDate: FieldRef<"SubscribePackage", 'DateTime'>
    readonly endDate: FieldRef<"SubscribePackage", 'DateTime'>
    readonly status: FieldRef<"SubscribePackage", 'String'>
    readonly createdAt: FieldRef<"SubscribePackage", 'DateTime'>
    readonly updatedAt: FieldRef<"SubscribePackage", 'DateTime'>
    readonly packageId: FieldRef<"SubscribePackage", 'Int'>
    readonly userId: FieldRef<"SubscribePackage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SubscribePackage findUnique
   */
  export type SubscribePackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter, which SubscribePackage to fetch.
     */
    where: SubscribePackageWhereUniqueInput
  }

  /**
   * SubscribePackage findUniqueOrThrow
   */
  export type SubscribePackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter, which SubscribePackage to fetch.
     */
    where: SubscribePackageWhereUniqueInput
  }

  /**
   * SubscribePackage findFirst
   */
  export type SubscribePackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter, which SubscribePackage to fetch.
     */
    where?: SubscribePackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscribePackages to fetch.
     */
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscribePackages.
     */
    cursor?: SubscribePackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscribePackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscribePackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscribePackages.
     */
    distinct?: SubscribePackageScalarFieldEnum | SubscribePackageScalarFieldEnum[]
  }

  /**
   * SubscribePackage findFirstOrThrow
   */
  export type SubscribePackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter, which SubscribePackage to fetch.
     */
    where?: SubscribePackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscribePackages to fetch.
     */
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscribePackages.
     */
    cursor?: SubscribePackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscribePackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscribePackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscribePackages.
     */
    distinct?: SubscribePackageScalarFieldEnum | SubscribePackageScalarFieldEnum[]
  }

  /**
   * SubscribePackage findMany
   */
  export type SubscribePackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter, which SubscribePackages to fetch.
     */
    where?: SubscribePackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscribePackages to fetch.
     */
    orderBy?: SubscribePackageOrderByWithRelationInput | SubscribePackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscribePackages.
     */
    cursor?: SubscribePackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscribePackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscribePackages.
     */
    skip?: number
    distinct?: SubscribePackageScalarFieldEnum | SubscribePackageScalarFieldEnum[]
  }

  /**
   * SubscribePackage create
   */
  export type SubscribePackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscribePackage.
     */
    data: XOR<SubscribePackageCreateInput, SubscribePackageUncheckedCreateInput>
  }

  /**
   * SubscribePackage createMany
   */
  export type SubscribePackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscribePackages.
     */
    data: SubscribePackageCreateManyInput | SubscribePackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscribePackage createManyAndReturn
   */
  export type SubscribePackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * The data used to create many SubscribePackages.
     */
    data: SubscribePackageCreateManyInput | SubscribePackageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscribePackage update
   */
  export type SubscribePackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscribePackage.
     */
    data: XOR<SubscribePackageUpdateInput, SubscribePackageUncheckedUpdateInput>
    /**
     * Choose, which SubscribePackage to update.
     */
    where: SubscribePackageWhereUniqueInput
  }

  /**
   * SubscribePackage updateMany
   */
  export type SubscribePackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscribePackages.
     */
    data: XOR<SubscribePackageUpdateManyMutationInput, SubscribePackageUncheckedUpdateManyInput>
    /**
     * Filter which SubscribePackages to update
     */
    where?: SubscribePackageWhereInput
    /**
     * Limit how many SubscribePackages to update.
     */
    limit?: number
  }

  /**
   * SubscribePackage updateManyAndReturn
   */
  export type SubscribePackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * The data used to update SubscribePackages.
     */
    data: XOR<SubscribePackageUpdateManyMutationInput, SubscribePackageUncheckedUpdateManyInput>
    /**
     * Filter which SubscribePackages to update
     */
    where?: SubscribePackageWhereInput
    /**
     * Limit how many SubscribePackages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscribePackage upsert
   */
  export type SubscribePackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscribePackage to update in case it exists.
     */
    where: SubscribePackageWhereUniqueInput
    /**
     * In case the SubscribePackage found by the `where` argument doesn't exist, create a new SubscribePackage with this data.
     */
    create: XOR<SubscribePackageCreateInput, SubscribePackageUncheckedCreateInput>
    /**
     * In case the SubscribePackage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscribePackageUpdateInput, SubscribePackageUncheckedUpdateInput>
  }

  /**
   * SubscribePackage delete
   */
  export type SubscribePackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
    /**
     * Filter which SubscribePackage to delete.
     */
    where: SubscribePackageWhereUniqueInput
  }

  /**
   * SubscribePackage deleteMany
   */
  export type SubscribePackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscribePackages to delete
     */
    where?: SubscribePackageWhereInput
    /**
     * Limit how many SubscribePackages to delete.
     */
    limit?: number
  }

  /**
   * SubscribePackage.transaction
   */
  export type SubscribePackage$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * SubscribePackage without action
   */
  export type SubscribePackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribePackage
     */
    select?: SubscribePackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscribePackage
     */
    omit?: SubscribePackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscribePackageInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    subscribe_package_id: number | null
    userId: number | null
  }

  export type TransactionSumAggregateOutputType = {
    id: number | null
    amount: number | null
    subscribe_package_id: number | null
    userId: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: number | null
    amount: number | null
    paymentMethod: string | null
    paymentStatus: string | null
    transactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subscribe_package_id: number | null
    userId: number | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    paymentMethod: string | null
    paymentStatus: string | null
    transactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    subscribe_package_id: number | null
    userId: number | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    amount: number
    paymentMethod: number
    paymentStatus: number
    transactionId: number
    createdAt: number
    updatedAt: number
    subscribe_package_id: number
    userId: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    id?: true
    amount?: true
    subscribe_package_id?: true
    userId?: true
  }

  export type TransactionSumAggregateInputType = {
    id?: true
    amount?: true
    subscribe_package_id?: true
    userId?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
    subscribe_package_id?: true
    userId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
    subscribe_package_id?: true
    userId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
    subscribe_package_id?: true
    userId?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: number
    amount: number
    paymentMethod: string
    paymentStatus: string
    transactionId: string | null
    createdAt: Date
    updatedAt: Date
    subscribe_package_id: number
    userId: number
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscribe_package_id?: boolean
    userId?: boolean
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscribe_package_id?: boolean
    userId?: boolean
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscribe_package_id?: boolean
    userId?: boolean
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscribe_package_id?: boolean
    userId?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "paymentMethod" | "paymentStatus" | "transactionId" | "createdAt" | "updatedAt" | "subscribe_package_id" | "userId", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscribe_package?: boolean | SubscribePackageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      subscribe_package: Prisma.$SubscribePackagePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: number
      paymentMethod: string
      paymentStatus: string
      transactionId: string | null
      createdAt: Date
      updatedAt: Date
      subscribe_package_id: number
      userId: number
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscribe_package<T extends SubscribePackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscribePackageDefaultArgs<ExtArgs>>): Prisma__SubscribePackageClient<$Result.GetResult<Prisma.$SubscribePackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'Int'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly paymentMethod: FieldRef<"Transaction", 'String'>
    readonly paymentStatus: FieldRef<"Transaction", 'String'>
    readonly transactionId: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
    readonly subscribe_package_id: FieldRef<"Transaction", 'Int'>
    readonly userId: FieldRef<"Transaction", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    email_verification_at: 'email_verification_at',
    utype: 'utype',
    status: 'status',
    packageActive: 'packageActive',
    totalProfiles: 'totalProfiles',
    activeProfiles: 'activeProfiles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccessTokenScalarFieldEnum: {
    id: 'id',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_at: 'expires_at',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccessTokenScalarFieldEnum = (typeof AccessTokenScalarFieldEnum)[keyof typeof AccessTokenScalarFieldEnum]


  export const VendorProfileScalarFieldEnum: {
    id: 'id',
    company: 'company',
    state: 'state',
    city: 'city',
    zipcode: 'zipcode',
    address: 'address',
    country: 'country',
    companyLogo: 'companyLogo',
    fb: 'fb',
    ln: 'ln',
    in: 'in',
    yt: 'yt',
    webUrl: 'webUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type VendorProfileScalarFieldEnum = (typeof VendorProfileScalarFieldEnum)[keyof typeof VendorProfileScalarFieldEnum]


  export const PackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    duration: 'duration',
    profiles: 'profiles',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const SubscribePackageScalarFieldEnum: {
    id: 'id',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    packageId: 'packageId',
    userId: 'userId'
  };

  export type SubscribePackageScalarFieldEnum = (typeof SubscribePackageScalarFieldEnum)[keyof typeof SubscribePackageScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    paymentStatus: 'paymentStatus',
    transactionId: 'transactionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    subscribe_package_id: 'subscribe_package_id',
    userId: 'userId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email_verification_at?: DateTimeNullableFilter<"User"> | Date | string | null
    utype?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    packageActive?: StringFilter<"User"> | string
    totalProfiles?: IntNullableFilter<"User"> | number | null
    activeProfiles?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profiles?: VendorProfileListRelationFilter
    access_tokens?: AccessTokenListRelationFilter
    subscribe_packages?: SubscribePackageListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    email_verification_at?: SortOrderInput | SortOrder
    utype?: SortOrder
    status?: SortOrder
    packageActive?: SortOrder
    totalProfiles?: SortOrderInput | SortOrder
    activeProfiles?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profiles?: VendorProfileOrderByRelationAggregateInput
    access_tokens?: AccessTokenOrderByRelationAggregateInput
    subscribe_packages?: SubscribePackageOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email_verification_at?: DateTimeNullableFilter<"User"> | Date | string | null
    utype?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    packageActive?: StringFilter<"User"> | string
    totalProfiles?: IntNullableFilter<"User"> | number | null
    activeProfiles?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profiles?: VendorProfileListRelationFilter
    access_tokens?: AccessTokenListRelationFilter
    subscribe_packages?: SubscribePackageListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    email_verification_at?: SortOrderInput | SortOrder
    utype?: SortOrder
    status?: SortOrder
    packageActive?: SortOrder
    totalProfiles?: SortOrderInput | SortOrder
    activeProfiles?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    email_verification_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    utype?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    packageActive?: StringWithAggregatesFilter<"User"> | string
    totalProfiles?: IntNullableWithAggregatesFilter<"User"> | number | null
    activeProfiles?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccessTokenWhereInput = {
    AND?: AccessTokenWhereInput | AccessTokenWhereInput[]
    OR?: AccessTokenWhereInput[]
    NOT?: AccessTokenWhereInput | AccessTokenWhereInput[]
    id?: IntFilter<"AccessToken"> | number
    access_token?: StringFilter<"AccessToken"> | string
    refresh_token?: StringNullableFilter<"AccessToken"> | string | null
    expires_at?: DateTimeFilter<"AccessToken"> | Date | string
    userId?: IntFilter<"AccessToken"> | number
    createdAt?: DateTimeFilter<"AccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"AccessToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccessTokenOrderByWithRelationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccessTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    access_token?: string
    refresh_token?: string
    AND?: AccessTokenWhereInput | AccessTokenWhereInput[]
    OR?: AccessTokenWhereInput[]
    NOT?: AccessTokenWhereInput | AccessTokenWhereInput[]
    expires_at?: DateTimeFilter<"AccessToken"> | Date | string
    userId?: IntFilter<"AccessToken"> | number
    createdAt?: DateTimeFilter<"AccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"AccessToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "access_token" | "refresh_token">

  export type AccessTokenOrderByWithAggregationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccessTokenCountOrderByAggregateInput
    _avg?: AccessTokenAvgOrderByAggregateInput
    _max?: AccessTokenMaxOrderByAggregateInput
    _min?: AccessTokenMinOrderByAggregateInput
    _sum?: AccessTokenSumOrderByAggregateInput
  }

  export type AccessTokenScalarWhereWithAggregatesInput = {
    AND?: AccessTokenScalarWhereWithAggregatesInput | AccessTokenScalarWhereWithAggregatesInput[]
    OR?: AccessTokenScalarWhereWithAggregatesInput[]
    NOT?: AccessTokenScalarWhereWithAggregatesInput | AccessTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AccessToken"> | number
    access_token?: StringWithAggregatesFilter<"AccessToken"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"AccessToken"> | string | null
    expires_at?: DateTimeWithAggregatesFilter<"AccessToken"> | Date | string
    userId?: IntWithAggregatesFilter<"AccessToken"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AccessToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AccessToken"> | Date | string
  }

  export type VendorProfileWhereInput = {
    AND?: VendorProfileWhereInput | VendorProfileWhereInput[]
    OR?: VendorProfileWhereInput[]
    NOT?: VendorProfileWhereInput | VendorProfileWhereInput[]
    id?: IntFilter<"VendorProfile"> | number
    company?: StringNullableFilter<"VendorProfile"> | string | null
    state?: StringNullableFilter<"VendorProfile"> | string | null
    city?: StringNullableFilter<"VendorProfile"> | string | null
    zipcode?: StringNullableFilter<"VendorProfile"> | string | null
    address?: StringNullableFilter<"VendorProfile"> | string | null
    country?: StringNullableFilter<"VendorProfile"> | string | null
    companyLogo?: StringNullableFilter<"VendorProfile"> | string | null
    fb?: StringNullableFilter<"VendorProfile"> | string | null
    ln?: StringNullableFilter<"VendorProfile"> | string | null
    in?: StringNullableFilter<"VendorProfile"> | string | null
    yt?: StringNullableFilter<"VendorProfile"> | string | null
    webUrl?: StringNullableFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendorProfile"> | Date | string
    userId?: IntFilter<"VendorProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VendorProfileOrderByWithRelationInput = {
    id?: SortOrder
    company?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    zipcode?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    companyLogo?: SortOrderInput | SortOrder
    fb?: SortOrderInput | SortOrder
    ln?: SortOrderInput | SortOrder
    in?: SortOrderInput | SortOrder
    yt?: SortOrderInput | SortOrder
    webUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VendorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendorProfileWhereInput | VendorProfileWhereInput[]
    OR?: VendorProfileWhereInput[]
    NOT?: VendorProfileWhereInput | VendorProfileWhereInput[]
    company?: StringNullableFilter<"VendorProfile"> | string | null
    state?: StringNullableFilter<"VendorProfile"> | string | null
    city?: StringNullableFilter<"VendorProfile"> | string | null
    zipcode?: StringNullableFilter<"VendorProfile"> | string | null
    address?: StringNullableFilter<"VendorProfile"> | string | null
    country?: StringNullableFilter<"VendorProfile"> | string | null
    companyLogo?: StringNullableFilter<"VendorProfile"> | string | null
    fb?: StringNullableFilter<"VendorProfile"> | string | null
    ln?: StringNullableFilter<"VendorProfile"> | string | null
    in?: StringNullableFilter<"VendorProfile"> | string | null
    yt?: StringNullableFilter<"VendorProfile"> | string | null
    webUrl?: StringNullableFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendorProfile"> | Date | string
    userId?: IntFilter<"VendorProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type VendorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    company?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    zipcode?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    companyLogo?: SortOrderInput | SortOrder
    fb?: SortOrderInput | SortOrder
    ln?: SortOrderInput | SortOrder
    in?: SortOrderInput | SortOrder
    yt?: SortOrderInput | SortOrder
    webUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: VendorProfileCountOrderByAggregateInput
    _avg?: VendorProfileAvgOrderByAggregateInput
    _max?: VendorProfileMaxOrderByAggregateInput
    _min?: VendorProfileMinOrderByAggregateInput
    _sum?: VendorProfileSumOrderByAggregateInput
  }

  export type VendorProfileScalarWhereWithAggregatesInput = {
    AND?: VendorProfileScalarWhereWithAggregatesInput | VendorProfileScalarWhereWithAggregatesInput[]
    OR?: VendorProfileScalarWhereWithAggregatesInput[]
    NOT?: VendorProfileScalarWhereWithAggregatesInput | VendorProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VendorProfile"> | number
    company?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    state?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    city?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    zipcode?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    address?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    country?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    companyLogo?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    fb?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    ln?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    in?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    yt?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    webUrl?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VendorProfile"> | Date | string
    userId?: IntWithAggregatesFilter<"VendorProfile"> | number
  }

  export type PackageWhereInput = {
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    id?: IntFilter<"Package"> | number
    name?: StringNullableFilter<"Package"> | string | null
    price?: FloatFilter<"Package"> | number
    duration?: IntFilter<"Package"> | number
    profiles?: IntFilter<"Package"> | number
    description?: StringNullableFilter<"Package"> | string | null
    status?: StringFilter<"Package"> | string
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    subscribe_packages?: SubscribePackageListRelationFilter
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_packages?: SubscribePackageOrderByRelationAggregateInput
  }

  export type PackageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    name?: StringNullableFilter<"Package"> | string | null
    price?: FloatFilter<"Package"> | number
    duration?: IntFilter<"Package"> | number
    profiles?: IntFilter<"Package"> | number
    description?: StringNullableFilter<"Package"> | string | null
    status?: StringFilter<"Package"> | string
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    subscribe_packages?: SubscribePackageListRelationFilter
  }, "id">

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PackageCountOrderByAggregateInput
    _avg?: PackageAvgOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
    _sum?: PackageSumOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    OR?: PackageScalarWhereWithAggregatesInput[]
    NOT?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Package"> | number
    name?: StringNullableWithAggregatesFilter<"Package"> | string | null
    price?: FloatWithAggregatesFilter<"Package"> | number
    duration?: IntWithAggregatesFilter<"Package"> | number
    profiles?: IntWithAggregatesFilter<"Package"> | number
    description?: StringNullableWithAggregatesFilter<"Package"> | string | null
    status?: StringWithAggregatesFilter<"Package"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
  }

  export type SubscribePackageWhereInput = {
    AND?: SubscribePackageWhereInput | SubscribePackageWhereInput[]
    OR?: SubscribePackageWhereInput[]
    NOT?: SubscribePackageWhereInput | SubscribePackageWhereInput[]
    id?: IntFilter<"SubscribePackage"> | number
    startDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    endDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    status?: StringFilter<"SubscribePackage"> | string
    createdAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    updatedAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    packageId?: IntFilter<"SubscribePackage"> | number
    userId?: IntFilter<"SubscribePackage"> | number
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type SubscribePackageOrderByWithRelationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
    package?: PackageOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type SubscribePackageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubscribePackageWhereInput | SubscribePackageWhereInput[]
    OR?: SubscribePackageWhereInput[]
    NOT?: SubscribePackageWhereInput | SubscribePackageWhereInput[]
    startDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    endDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    status?: StringFilter<"SubscribePackage"> | string
    createdAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    updatedAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    packageId?: IntFilter<"SubscribePackage"> | number
    userId?: IntFilter<"SubscribePackage"> | number
    package?: XOR<PackageScalarRelationFilter, PackageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id">

  export type SubscribePackageOrderByWithAggregationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
    _count?: SubscribePackageCountOrderByAggregateInput
    _avg?: SubscribePackageAvgOrderByAggregateInput
    _max?: SubscribePackageMaxOrderByAggregateInput
    _min?: SubscribePackageMinOrderByAggregateInput
    _sum?: SubscribePackageSumOrderByAggregateInput
  }

  export type SubscribePackageScalarWhereWithAggregatesInput = {
    AND?: SubscribePackageScalarWhereWithAggregatesInput | SubscribePackageScalarWhereWithAggregatesInput[]
    OR?: SubscribePackageScalarWhereWithAggregatesInput[]
    NOT?: SubscribePackageScalarWhereWithAggregatesInput | SubscribePackageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubscribePackage"> | number
    startDate?: DateTimeWithAggregatesFilter<"SubscribePackage"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"SubscribePackage"> | Date | string
    status?: StringWithAggregatesFilter<"SubscribePackage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SubscribePackage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubscribePackage"> | Date | string
    packageId?: IntWithAggregatesFilter<"SubscribePackage"> | number
    userId?: IntWithAggregatesFilter<"SubscribePackage"> | number
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: IntFilter<"Transaction"> | number
    amount?: FloatFilter<"Transaction"> | number
    paymentMethod?: StringFilter<"Transaction"> | string
    paymentStatus?: StringFilter<"Transaction"> | string
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    subscribe_package_id?: IntFilter<"Transaction"> | number
    userId?: IntFilter<"Transaction"> | number
    subscribe_package?: XOR<SubscribePackageScalarRelationFilter, SubscribePackageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
    subscribe_package?: SubscribePackageOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    transactionId?: string
    subscribe_package_id?: number
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    amount?: FloatFilter<"Transaction"> | number
    paymentMethod?: StringFilter<"Transaction"> | string
    paymentStatus?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    userId?: IntFilter<"Transaction"> | number
    subscribe_package?: XOR<SubscribePackageScalarRelationFilter, SubscribePackageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "transactionId" | "subscribe_package_id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Transaction"> | number
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    paymentMethod?: StringWithAggregatesFilter<"Transaction"> | string
    paymentStatus?: StringWithAggregatesFilter<"Transaction"> | string
    transactionId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    subscribe_package_id?: IntWithAggregatesFilter<"Transaction"> | number
    userId?: IntWithAggregatesFilter<"Transaction"> | number
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileUncheckedCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenUncheckedCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUncheckedUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUncheckedUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenCreateInput = {
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccess_tokensInput
  }

  export type AccessTokenUncheckedCreateInput = {
    id?: number
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessTokenUpdateInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccess_tokensNestedInput
  }

  export type AccessTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenCreateManyInput = {
    id?: number
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessTokenUpdateManyMutationInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileCreateInput = {
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfilesInput
  }

  export type VendorProfileUncheckedCreateInput = {
    id?: number
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type VendorProfileUpdateInput = {
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfilesNestedInput
  }

  export type VendorProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type VendorProfileCreateManyInput = {
    id?: number
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type VendorProfileUpdateManyMutationInput = {
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PackageCreateInput = {
    name?: string | null
    price?: number
    duration?: number
    profiles?: number
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_packages?: SubscribePackageCreateNestedManyWithoutPackageInput
  }

  export type PackageUncheckedCreateInput = {
    id?: number
    name?: string | null
    price?: number
    duration?: number
    profiles?: number
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_packages?: SubscribePackageUncheckedCreateNestedManyWithoutPackageInput
  }

  export type PackageUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_packages?: SubscribePackageUpdateManyWithoutPackageNestedInput
  }

  export type PackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_packages?: SubscribePackageUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type PackageCreateManyInput = {
    id?: number
    name?: string | null
    price?: number
    duration?: number
    profiles?: number
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscribePackageCreateInput = {
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    package: PackageCreateNestedOneWithoutSubscribe_packagesInput
    user: UserCreateNestedOneWithoutSubscribe_packagesInput
    transaction?: TransactionCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageUncheckedCreateInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packageId: number
    userId: number
    transaction?: TransactionUncheckedCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: PackageUpdateOneRequiredWithoutSubscribe_packagesNestedInput
    user?: UserUpdateOneRequiredWithoutSubscribe_packagesNestedInput
    transaction?: TransactionUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    transaction?: TransactionUncheckedUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageCreateManyInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packageId: number
    userId: number
  }

  export type SubscribePackageUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscribePackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionCreateInput = {
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package: SubscribePackageCreateNestedOneWithoutTransactionInput
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: number
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package_id: number
    userId: number
  }

  export type TransactionUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package?: SubscribePackageUpdateOneRequiredWithoutTransactionNestedInput
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package_id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionCreateManyInput = {
    id?: number
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package_id: number
    userId: number
  }

  export type TransactionUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package_id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
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

  export type VendorProfileListRelationFilter = {
    every?: VendorProfileWhereInput
    some?: VendorProfileWhereInput
    none?: VendorProfileWhereInput
  }

  export type AccessTokenListRelationFilter = {
    every?: AccessTokenWhereInput
    some?: AccessTokenWhereInput
    none?: AccessTokenWhereInput
  }

  export type SubscribePackageListRelationFilter = {
    every?: SubscribePackageWhereInput
    some?: SubscribePackageWhereInput
    none?: SubscribePackageWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VendorProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccessTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscribePackageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    email_verification_at?: SortOrder
    utype?: SortOrder
    status?: SortOrder
    packageActive?: SortOrder
    totalProfiles?: SortOrder
    activeProfiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    totalProfiles?: SortOrder
    activeProfiles?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    email_verification_at?: SortOrder
    utype?: SortOrder
    status?: SortOrder
    packageActive?: SortOrder
    totalProfiles?: SortOrder
    activeProfiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    email_verification_at?: SortOrder
    utype?: SortOrder
    status?: SortOrder
    packageActive?: SortOrder
    totalProfiles?: SortOrder
    activeProfiles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    totalProfiles?: SortOrder
    activeProfiles?: SortOrder
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccessTokenCountOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AccessTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessTokenMinOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expires_at?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccessTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
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

  export type VendorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipcode?: SortOrder
    address?: SortOrder
    country?: SortOrder
    companyLogo?: SortOrder
    fb?: SortOrder
    ln?: SortOrder
    in?: SortOrder
    yt?: SortOrder
    webUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type VendorProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type VendorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipcode?: SortOrder
    address?: SortOrder
    country?: SortOrder
    companyLogo?: SortOrder
    fb?: SortOrder
    ln?: SortOrder
    in?: SortOrder
    yt?: SortOrder
    webUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type VendorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    state?: SortOrder
    city?: SortOrder
    zipcode?: SortOrder
    address?: SortOrder
    country?: SortOrder
    companyLogo?: SortOrder
    fb?: SortOrder
    ln?: SortOrder
    in?: SortOrder
    yt?: SortOrder
    webUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type VendorProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    profiles?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PackageScalarRelationFilter = {
    is?: PackageWhereInput
    isNot?: PackageWhereInput
  }

  export type TransactionNullableScalarRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type SubscribePackageCountOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
  }

  export type SubscribePackageAvgOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
  }

  export type SubscribePackageMaxOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
  }

  export type SubscribePackageMinOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
  }

  export type SubscribePackageSumOrderByAggregateInput = {
    id?: SortOrder
    packageId?: SortOrder
    userId?: SortOrder
  }

  export type SubscribePackageScalarRelationFilter = {
    is?: SubscribePackageWhereInput
    isNot?: SubscribePackageWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    subscribe_package_id?: SortOrder
    userId?: SortOrder
  }

  export type VendorProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput> | VendorProfileCreateWithoutUserInput[] | VendorProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorProfileCreateOrConnectWithoutUserInput | VendorProfileCreateOrConnectWithoutUserInput[]
    createMany?: VendorProfileCreateManyUserInputEnvelope
    connect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
  }

  export type AccessTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput> | AccessTokenCreateWithoutUserInput[] | AccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessTokenCreateOrConnectWithoutUserInput | AccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: AccessTokenCreateManyUserInputEnvelope
    connect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
  }

  export type SubscribePackageCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput> | SubscribePackageCreateWithoutUserInput[] | SubscribePackageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutUserInput | SubscribePackageCreateOrConnectWithoutUserInput[]
    createMany?: SubscribePackageCreateManyUserInputEnvelope
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type VendorProfileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput> | VendorProfileCreateWithoutUserInput[] | VendorProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorProfileCreateOrConnectWithoutUserInput | VendorProfileCreateOrConnectWithoutUserInput[]
    createMany?: VendorProfileCreateManyUserInputEnvelope
    connect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
  }

  export type AccessTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput> | AccessTokenCreateWithoutUserInput[] | AccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessTokenCreateOrConnectWithoutUserInput | AccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: AccessTokenCreateManyUserInputEnvelope
    connect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
  }

  export type SubscribePackageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput> | SubscribePackageCreateWithoutUserInput[] | SubscribePackageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutUserInput | SubscribePackageCreateOrConnectWithoutUserInput[]
    createMany?: SubscribePackageCreateManyUserInputEnvelope
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type VendorProfileUpdateManyWithoutUserNestedInput = {
    create?: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput> | VendorProfileCreateWithoutUserInput[] | VendorProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorProfileCreateOrConnectWithoutUserInput | VendorProfileCreateOrConnectWithoutUserInput[]
    upsert?: VendorProfileUpsertWithWhereUniqueWithoutUserInput | VendorProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VendorProfileCreateManyUserInputEnvelope
    set?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    disconnect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    delete?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    connect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    update?: VendorProfileUpdateWithWhereUniqueWithoutUserInput | VendorProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VendorProfileUpdateManyWithWhereWithoutUserInput | VendorProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VendorProfileScalarWhereInput | VendorProfileScalarWhereInput[]
  }

  export type AccessTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput> | AccessTokenCreateWithoutUserInput[] | AccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessTokenCreateOrConnectWithoutUserInput | AccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: AccessTokenUpsertWithWhereUniqueWithoutUserInput | AccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccessTokenCreateManyUserInputEnvelope
    set?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    disconnect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    delete?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    connect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    update?: AccessTokenUpdateWithWhereUniqueWithoutUserInput | AccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccessTokenUpdateManyWithWhereWithoutUserInput | AccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccessTokenScalarWhereInput | AccessTokenScalarWhereInput[]
  }

  export type SubscribePackageUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput> | SubscribePackageCreateWithoutUserInput[] | SubscribePackageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutUserInput | SubscribePackageCreateOrConnectWithoutUserInput[]
    upsert?: SubscribePackageUpsertWithWhereUniqueWithoutUserInput | SubscribePackageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscribePackageCreateManyUserInputEnvelope
    set?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    disconnect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    delete?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    update?: SubscribePackageUpdateWithWhereUniqueWithoutUserInput | SubscribePackageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscribePackageUpdateManyWithWhereWithoutUserInput | SubscribePackageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendorProfileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput> | VendorProfileCreateWithoutUserInput[] | VendorProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VendorProfileCreateOrConnectWithoutUserInput | VendorProfileCreateOrConnectWithoutUserInput[]
    upsert?: VendorProfileUpsertWithWhereUniqueWithoutUserInput | VendorProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VendorProfileCreateManyUserInputEnvelope
    set?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    disconnect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    delete?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    connect?: VendorProfileWhereUniqueInput | VendorProfileWhereUniqueInput[]
    update?: VendorProfileUpdateWithWhereUniqueWithoutUserInput | VendorProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VendorProfileUpdateManyWithWhereWithoutUserInput | VendorProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VendorProfileScalarWhereInput | VendorProfileScalarWhereInput[]
  }

  export type AccessTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput> | AccessTokenCreateWithoutUserInput[] | AccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessTokenCreateOrConnectWithoutUserInput | AccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: AccessTokenUpsertWithWhereUniqueWithoutUserInput | AccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccessTokenCreateManyUserInputEnvelope
    set?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    disconnect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    delete?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    connect?: AccessTokenWhereUniqueInput | AccessTokenWhereUniqueInput[]
    update?: AccessTokenUpdateWithWhereUniqueWithoutUserInput | AccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccessTokenUpdateManyWithWhereWithoutUserInput | AccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccessTokenScalarWhereInput | AccessTokenScalarWhereInput[]
  }

  export type SubscribePackageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput> | SubscribePackageCreateWithoutUserInput[] | SubscribePackageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutUserInput | SubscribePackageCreateOrConnectWithoutUserInput[]
    upsert?: SubscribePackageUpsertWithWhereUniqueWithoutUserInput | SubscribePackageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscribePackageCreateManyUserInputEnvelope
    set?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    disconnect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    delete?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    update?: SubscribePackageUpdateWithWhereUniqueWithoutUserInput | SubscribePackageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscribePackageUpdateManyWithWhereWithoutUserInput | SubscribePackageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccess_tokensInput = {
    create?: XOR<UserCreateWithoutAccess_tokensInput, UserUncheckedCreateWithoutAccess_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccess_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutAccess_tokensNestedInput = {
    create?: XOR<UserCreateWithoutAccess_tokensInput, UserUncheckedCreateWithoutAccess_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccess_tokensInput
    upsert?: UserUpsertWithoutAccess_tokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccess_tokensInput, UserUpdateWithoutAccess_tokensInput>, UserUncheckedUpdateWithoutAccess_tokensInput>
  }

  export type UserCreateNestedOneWithoutProfilesInput = {
    create?: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfilesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfilesNestedInput = {
    create?: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfilesInput
    upsert?: UserUpsertWithoutProfilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfilesInput, UserUpdateWithoutProfilesInput>, UserUncheckedUpdateWithoutProfilesInput>
  }

  export type SubscribePackageCreateNestedManyWithoutPackageInput = {
    create?: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput> | SubscribePackageCreateWithoutPackageInput[] | SubscribePackageUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutPackageInput | SubscribePackageCreateOrConnectWithoutPackageInput[]
    createMany?: SubscribePackageCreateManyPackageInputEnvelope
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
  }

  export type SubscribePackageUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput> | SubscribePackageCreateWithoutPackageInput[] | SubscribePackageUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutPackageInput | SubscribePackageCreateOrConnectWithoutPackageInput[]
    createMany?: SubscribePackageCreateManyPackageInputEnvelope
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubscribePackageUpdateManyWithoutPackageNestedInput = {
    create?: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput> | SubscribePackageCreateWithoutPackageInput[] | SubscribePackageUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutPackageInput | SubscribePackageCreateOrConnectWithoutPackageInput[]
    upsert?: SubscribePackageUpsertWithWhereUniqueWithoutPackageInput | SubscribePackageUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: SubscribePackageCreateManyPackageInputEnvelope
    set?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    disconnect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    delete?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    update?: SubscribePackageUpdateWithWhereUniqueWithoutPackageInput | SubscribePackageUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: SubscribePackageUpdateManyWithWhereWithoutPackageInput | SubscribePackageUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
  }

  export type SubscribePackageUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput> | SubscribePackageCreateWithoutPackageInput[] | SubscribePackageUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutPackageInput | SubscribePackageCreateOrConnectWithoutPackageInput[]
    upsert?: SubscribePackageUpsertWithWhereUniqueWithoutPackageInput | SubscribePackageUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: SubscribePackageCreateManyPackageInputEnvelope
    set?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    disconnect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    delete?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    connect?: SubscribePackageWhereUniqueInput | SubscribePackageWhereUniqueInput[]
    update?: SubscribePackageUpdateWithWhereUniqueWithoutPackageInput | SubscribePackageUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: SubscribePackageUpdateManyWithWhereWithoutPackageInput | SubscribePackageUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
  }

  export type PackageCreateNestedOneWithoutSubscribe_packagesInput = {
    create?: XOR<PackageCreateWithoutSubscribe_packagesInput, PackageUncheckedCreateWithoutSubscribe_packagesInput>
    connectOrCreate?: PackageCreateOrConnectWithoutSubscribe_packagesInput
    connect?: PackageWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubscribe_packagesInput = {
    create?: XOR<UserCreateWithoutSubscribe_packagesInput, UserUncheckedCreateWithoutSubscribe_packagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscribe_packagesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutSubscribe_packageInput = {
    create?: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscribe_packageInput
    connect?: TransactionWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedOneWithoutSubscribe_packageInput = {
    create?: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscribe_packageInput
    connect?: TransactionWhereUniqueInput
  }

  export type PackageUpdateOneRequiredWithoutSubscribe_packagesNestedInput = {
    create?: XOR<PackageCreateWithoutSubscribe_packagesInput, PackageUncheckedCreateWithoutSubscribe_packagesInput>
    connectOrCreate?: PackageCreateOrConnectWithoutSubscribe_packagesInput
    upsert?: PackageUpsertWithoutSubscribe_packagesInput
    connect?: PackageWhereUniqueInput
    update?: XOR<XOR<PackageUpdateToOneWithWhereWithoutSubscribe_packagesInput, PackageUpdateWithoutSubscribe_packagesInput>, PackageUncheckedUpdateWithoutSubscribe_packagesInput>
  }

  export type UserUpdateOneRequiredWithoutSubscribe_packagesNestedInput = {
    create?: XOR<UserCreateWithoutSubscribe_packagesInput, UserUncheckedCreateWithoutSubscribe_packagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscribe_packagesInput
    upsert?: UserUpsertWithoutSubscribe_packagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscribe_packagesInput, UserUpdateWithoutSubscribe_packagesInput>, UserUncheckedUpdateWithoutSubscribe_packagesInput>
  }

  export type TransactionUpdateOneWithoutSubscribe_packageNestedInput = {
    create?: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscribe_packageInput
    upsert?: TransactionUpsertWithoutSubscribe_packageInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutSubscribe_packageInput, TransactionUpdateWithoutSubscribe_packageInput>, TransactionUncheckedUpdateWithoutSubscribe_packageInput>
  }

  export type TransactionUncheckedUpdateOneWithoutSubscribe_packageNestedInput = {
    create?: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutSubscribe_packageInput
    upsert?: TransactionUpsertWithoutSubscribe_packageInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutSubscribe_packageInput, TransactionUpdateWithoutSubscribe_packageInput>, TransactionUncheckedUpdateWithoutSubscribe_packageInput>
  }

  export type SubscribePackageCreateNestedOneWithoutTransactionInput = {
    create?: XOR<SubscribePackageCreateWithoutTransactionInput, SubscribePackageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutTransactionInput
    connect?: SubscribePackageWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type SubscribePackageUpdateOneRequiredWithoutTransactionNestedInput = {
    create?: XOR<SubscribePackageCreateWithoutTransactionInput, SubscribePackageUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: SubscribePackageCreateOrConnectWithoutTransactionInput
    upsert?: SubscribePackageUpsertWithoutTransactionInput
    connect?: SubscribePackageWhereUniqueInput
    update?: XOR<XOR<SubscribePackageUpdateToOneWithWhereWithoutTransactionInput, SubscribePackageUpdateWithoutTransactionInput>, SubscribePackageUncheckedUpdateWithoutTransactionInput>
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type VendorProfileCreateWithoutUserInput = {
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorProfileUncheckedCreateWithoutUserInput = {
    id?: number
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorProfileCreateOrConnectWithoutUserInput = {
    where: VendorProfileWhereUniqueInput
    create: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput>
  }

  export type VendorProfileCreateManyUserInputEnvelope = {
    data: VendorProfileCreateManyUserInput | VendorProfileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccessTokenCreateWithoutUserInput = {
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessTokenUncheckedCreateWithoutUserInput = {
    id?: number
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessTokenCreateOrConnectWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    create: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput>
  }

  export type AccessTokenCreateManyUserInputEnvelope = {
    data: AccessTokenCreateManyUserInput | AccessTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscribePackageCreateWithoutUserInput = {
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    package: PackageCreateNestedOneWithoutSubscribe_packagesInput
    transaction?: TransactionCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageUncheckedCreateWithoutUserInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packageId: number
    transaction?: TransactionUncheckedCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageCreateOrConnectWithoutUserInput = {
    where: SubscribePackageWhereUniqueInput
    create: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput>
  }

  export type SubscribePackageCreateManyUserInputEnvelope = {
    data: SubscribePackageCreateManyUserInput | SubscribePackageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package: SubscribePackageCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: number
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package_id: number
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VendorProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: VendorProfileWhereUniqueInput
    update: XOR<VendorProfileUpdateWithoutUserInput, VendorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<VendorProfileCreateWithoutUserInput, VendorProfileUncheckedCreateWithoutUserInput>
  }

  export type VendorProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: VendorProfileWhereUniqueInput
    data: XOR<VendorProfileUpdateWithoutUserInput, VendorProfileUncheckedUpdateWithoutUserInput>
  }

  export type VendorProfileUpdateManyWithWhereWithoutUserInput = {
    where: VendorProfileScalarWhereInput
    data: XOR<VendorProfileUpdateManyMutationInput, VendorProfileUncheckedUpdateManyWithoutUserInput>
  }

  export type VendorProfileScalarWhereInput = {
    AND?: VendorProfileScalarWhereInput | VendorProfileScalarWhereInput[]
    OR?: VendorProfileScalarWhereInput[]
    NOT?: VendorProfileScalarWhereInput | VendorProfileScalarWhereInput[]
    id?: IntFilter<"VendorProfile"> | number
    company?: StringNullableFilter<"VendorProfile"> | string | null
    state?: StringNullableFilter<"VendorProfile"> | string | null
    city?: StringNullableFilter<"VendorProfile"> | string | null
    zipcode?: StringNullableFilter<"VendorProfile"> | string | null
    address?: StringNullableFilter<"VendorProfile"> | string | null
    country?: StringNullableFilter<"VendorProfile"> | string | null
    companyLogo?: StringNullableFilter<"VendorProfile"> | string | null
    fb?: StringNullableFilter<"VendorProfile"> | string | null
    ln?: StringNullableFilter<"VendorProfile"> | string | null
    in?: StringNullableFilter<"VendorProfile"> | string | null
    yt?: StringNullableFilter<"VendorProfile"> | string | null
    webUrl?: StringNullableFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendorProfile"> | Date | string
    userId?: IntFilter<"VendorProfile"> | number
  }

  export type AccessTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    update: XOR<AccessTokenUpdateWithoutUserInput, AccessTokenUncheckedUpdateWithoutUserInput>
    create: XOR<AccessTokenCreateWithoutUserInput, AccessTokenUncheckedCreateWithoutUserInput>
  }

  export type AccessTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: AccessTokenWhereUniqueInput
    data: XOR<AccessTokenUpdateWithoutUserInput, AccessTokenUncheckedUpdateWithoutUserInput>
  }

  export type AccessTokenUpdateManyWithWhereWithoutUserInput = {
    where: AccessTokenScalarWhereInput
    data: XOR<AccessTokenUpdateManyMutationInput, AccessTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type AccessTokenScalarWhereInput = {
    AND?: AccessTokenScalarWhereInput | AccessTokenScalarWhereInput[]
    OR?: AccessTokenScalarWhereInput[]
    NOT?: AccessTokenScalarWhereInput | AccessTokenScalarWhereInput[]
    id?: IntFilter<"AccessToken"> | number
    access_token?: StringFilter<"AccessToken"> | string
    refresh_token?: StringNullableFilter<"AccessToken"> | string | null
    expires_at?: DateTimeFilter<"AccessToken"> | Date | string
    userId?: IntFilter<"AccessToken"> | number
    createdAt?: DateTimeFilter<"AccessToken"> | Date | string
    updatedAt?: DateTimeFilter<"AccessToken"> | Date | string
  }

  export type SubscribePackageUpsertWithWhereUniqueWithoutUserInput = {
    where: SubscribePackageWhereUniqueInput
    update: XOR<SubscribePackageUpdateWithoutUserInput, SubscribePackageUncheckedUpdateWithoutUserInput>
    create: XOR<SubscribePackageCreateWithoutUserInput, SubscribePackageUncheckedCreateWithoutUserInput>
  }

  export type SubscribePackageUpdateWithWhereUniqueWithoutUserInput = {
    where: SubscribePackageWhereUniqueInput
    data: XOR<SubscribePackageUpdateWithoutUserInput, SubscribePackageUncheckedUpdateWithoutUserInput>
  }

  export type SubscribePackageUpdateManyWithWhereWithoutUserInput = {
    where: SubscribePackageScalarWhereInput
    data: XOR<SubscribePackageUpdateManyMutationInput, SubscribePackageUncheckedUpdateManyWithoutUserInput>
  }

  export type SubscribePackageScalarWhereInput = {
    AND?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
    OR?: SubscribePackageScalarWhereInput[]
    NOT?: SubscribePackageScalarWhereInput | SubscribePackageScalarWhereInput[]
    id?: IntFilter<"SubscribePackage"> | number
    startDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    endDate?: DateTimeFilter<"SubscribePackage"> | Date | string
    status?: StringFilter<"SubscribePackage"> | string
    createdAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    updatedAt?: DateTimeFilter<"SubscribePackage"> | Date | string
    packageId?: IntFilter<"SubscribePackage"> | number
    userId?: IntFilter<"SubscribePackage"> | number
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: IntFilter<"Transaction"> | number
    amount?: FloatFilter<"Transaction"> | number
    paymentMethod?: StringFilter<"Transaction"> | string
    paymentStatus?: StringFilter<"Transaction"> | string
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    subscribe_package_id?: IntFilter<"Transaction"> | number
    userId?: IntFilter<"Transaction"> | number
  }

  export type UserCreateWithoutAccess_tokensInput = {
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccess_tokensInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileUncheckedCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccess_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccess_tokensInput, UserUncheckedCreateWithoutAccess_tokensInput>
  }

  export type UserUpsertWithoutAccess_tokensInput = {
    update: XOR<UserUpdateWithoutAccess_tokensInput, UserUncheckedUpdateWithoutAccess_tokensInput>
    create: XOR<UserCreateWithoutAccess_tokensInput, UserUncheckedCreateWithoutAccess_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccess_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccess_tokensInput, UserUncheckedUpdateWithoutAccess_tokensInput>
  }

  export type UserUpdateWithoutAccess_tokensInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccess_tokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUncheckedUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProfilesInput = {
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    access_tokens?: AccessTokenCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfilesInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    access_tokens?: AccessTokenUncheckedCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
  }

  export type UserUpsertWithoutProfilesInput = {
    update: XOR<UserUpdateWithoutProfilesInput, UserUncheckedUpdateWithoutProfilesInput>
    create: XOR<UserCreateWithoutProfilesInput, UserUncheckedCreateWithoutProfilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfilesInput, UserUncheckedUpdateWithoutProfilesInput>
  }

  export type UserUpdateWithoutProfilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    access_tokens?: AccessTokenUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    access_tokens?: AccessTokenUncheckedUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubscribePackageCreateWithoutPackageInput = {
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubscribe_packagesInput
    transaction?: TransactionCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageUncheckedCreateWithoutPackageInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    transaction?: TransactionUncheckedCreateNestedOneWithoutSubscribe_packageInput
  }

  export type SubscribePackageCreateOrConnectWithoutPackageInput = {
    where: SubscribePackageWhereUniqueInput
    create: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput>
  }

  export type SubscribePackageCreateManyPackageInputEnvelope = {
    data: SubscribePackageCreateManyPackageInput | SubscribePackageCreateManyPackageInput[]
    skipDuplicates?: boolean
  }

  export type SubscribePackageUpsertWithWhereUniqueWithoutPackageInput = {
    where: SubscribePackageWhereUniqueInput
    update: XOR<SubscribePackageUpdateWithoutPackageInput, SubscribePackageUncheckedUpdateWithoutPackageInput>
    create: XOR<SubscribePackageCreateWithoutPackageInput, SubscribePackageUncheckedCreateWithoutPackageInput>
  }

  export type SubscribePackageUpdateWithWhereUniqueWithoutPackageInput = {
    where: SubscribePackageWhereUniqueInput
    data: XOR<SubscribePackageUpdateWithoutPackageInput, SubscribePackageUncheckedUpdateWithoutPackageInput>
  }

  export type SubscribePackageUpdateManyWithWhereWithoutPackageInput = {
    where: SubscribePackageScalarWhereInput
    data: XOR<SubscribePackageUpdateManyMutationInput, SubscribePackageUncheckedUpdateManyWithoutPackageInput>
  }

  export type PackageCreateWithoutSubscribe_packagesInput = {
    name?: string | null
    price?: number
    duration?: number
    profiles?: number
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageUncheckedCreateWithoutSubscribe_packagesInput = {
    id?: number
    name?: string | null
    price?: number
    duration?: number
    profiles?: number
    description?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageCreateOrConnectWithoutSubscribe_packagesInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutSubscribe_packagesInput, PackageUncheckedCreateWithoutSubscribe_packagesInput>
  }

  export type UserCreateWithoutSubscribe_packagesInput = {
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscribe_packagesInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileUncheckedCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscribe_packagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscribe_packagesInput, UserUncheckedCreateWithoutSubscribe_packagesInput>
  }

  export type TransactionCreateWithoutSubscribe_packageInput = {
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutSubscribe_packageInput = {
    id?: number
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type TransactionCreateOrConnectWithoutSubscribe_packageInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
  }

  export type PackageUpsertWithoutSubscribe_packagesInput = {
    update: XOR<PackageUpdateWithoutSubscribe_packagesInput, PackageUncheckedUpdateWithoutSubscribe_packagesInput>
    create: XOR<PackageCreateWithoutSubscribe_packagesInput, PackageUncheckedCreateWithoutSubscribe_packagesInput>
    where?: PackageWhereInput
  }

  export type PackageUpdateToOneWithWhereWithoutSubscribe_packagesInput = {
    where?: PackageWhereInput
    data: XOR<PackageUpdateWithoutSubscribe_packagesInput, PackageUncheckedUpdateWithoutSubscribe_packagesInput>
  }

  export type PackageUpdateWithoutSubscribe_packagesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateWithoutSubscribe_packagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    profiles?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSubscribe_packagesInput = {
    update: XOR<UserUpdateWithoutSubscribe_packagesInput, UserUncheckedUpdateWithoutSubscribe_packagesInput>
    create: XOR<UserCreateWithoutSubscribe_packagesInput, UserUncheckedCreateWithoutSubscribe_packagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscribe_packagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscribe_packagesInput, UserUncheckedUpdateWithoutSubscribe_packagesInput>
  }

  export type UserUpdateWithoutSubscribe_packagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscribe_packagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUncheckedUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithoutSubscribe_packageInput = {
    update: XOR<TransactionUpdateWithoutSubscribe_packageInput, TransactionUncheckedUpdateWithoutSubscribe_packageInput>
    create: XOR<TransactionCreateWithoutSubscribe_packageInput, TransactionUncheckedCreateWithoutSubscribe_packageInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutSubscribe_packageInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutSubscribe_packageInput, TransactionUncheckedUpdateWithoutSubscribe_packageInput>
  }

  export type TransactionUpdateWithoutSubscribe_packageInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutSubscribe_packageInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SubscribePackageCreateWithoutTransactionInput = {
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    package: PackageCreateNestedOneWithoutSubscribe_packagesInput
    user: UserCreateNestedOneWithoutSubscribe_packagesInput
  }

  export type SubscribePackageUncheckedCreateWithoutTransactionInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packageId: number
    userId: number
  }

  export type SubscribePackageCreateOrConnectWithoutTransactionInput = {
    where: SubscribePackageWhereUniqueInput
    create: XOR<SubscribePackageCreateWithoutTransactionInput, SubscribePackageUncheckedCreateWithoutTransactionInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: number
    name: string
    email: string
    password: string
    email_verification_at?: Date | string | null
    utype?: string
    status?: string
    packageActive?: string
    totalProfiles?: number | null
    activeProfiles?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles?: VendorProfileUncheckedCreateNestedManyWithoutUserInput
    access_tokens?: AccessTokenUncheckedCreateNestedManyWithoutUserInput
    subscribe_packages?: SubscribePackageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type SubscribePackageUpsertWithoutTransactionInput = {
    update: XOR<SubscribePackageUpdateWithoutTransactionInput, SubscribePackageUncheckedUpdateWithoutTransactionInput>
    create: XOR<SubscribePackageCreateWithoutTransactionInput, SubscribePackageUncheckedCreateWithoutTransactionInput>
    where?: SubscribePackageWhereInput
  }

  export type SubscribePackageUpdateToOneWithWhereWithoutTransactionInput = {
    where?: SubscribePackageWhereInput
    data: XOR<SubscribePackageUpdateWithoutTransactionInput, SubscribePackageUncheckedUpdateWithoutTransactionInput>
  }

  export type SubscribePackageUpdateWithoutTransactionInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: PackageUpdateOneRequiredWithoutSubscribe_packagesNestedInput
    user?: UserUpdateOneRequiredWithoutSubscribe_packagesNestedInput
  }

  export type SubscribePackageUncheckedUpdateWithoutTransactionInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email_verification_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    utype?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageActive?: StringFieldUpdateOperationsInput | string
    totalProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    activeProfiles?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profiles?: VendorProfileUncheckedUpdateManyWithoutUserNestedInput
    access_tokens?: AccessTokenUncheckedUpdateManyWithoutUserNestedInput
    subscribe_packages?: SubscribePackageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VendorProfileCreateManyUserInput = {
    id?: number
    company?: string | null
    state?: string | null
    city?: string | null
    zipcode?: string | null
    address?: string | null
    country?: string | null
    companyLogo?: string | null
    fb?: string | null
    ln?: string | null
    in?: string | null
    yt?: string | null
    webUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccessTokenCreateManyUserInput = {
    id?: number
    access_token: string
    refresh_token?: string | null
    expires_at: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscribePackageCreateManyUserInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packageId: number
  }

  export type TransactionCreateManyUserInput = {
    id?: number
    amount: number
    paymentMethod: string
    paymentStatus?: string
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribe_package_id: number
  }

  export type VendorProfileUpdateWithoutUserInput = {
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    fb?: NullableStringFieldUpdateOperationsInput | string | null
    ln?: NullableStringFieldUpdateOperationsInput | string | null
    in?: NullableStringFieldUpdateOperationsInput | string | null
    yt?: NullableStringFieldUpdateOperationsInput | string | null
    webUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUpdateWithoutUserInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessTokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscribePackageUpdateWithoutUserInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: PackageUpdateOneRequiredWithoutSubscribe_packagesNestedInput
    transaction?: TransactionUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageId?: IntFieldUpdateOperationsInput | number
    transaction?: TransactionUncheckedUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packageId?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionUpdateWithoutUserInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package?: SubscribePackageUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package_id?: IntFieldUpdateOperationsInput | number
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribe_package_id?: IntFieldUpdateOperationsInput | number
  }

  export type SubscribePackageCreateManyPackageInput = {
    id?: number
    startDate?: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type SubscribePackageUpdateWithoutPackageInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubscribe_packagesNestedInput
    transaction?: TransactionUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageUncheckedUpdateWithoutPackageInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    transaction?: TransactionUncheckedUpdateOneWithoutSubscribe_packageNestedInput
  }

  export type SubscribePackageUncheckedUpdateManyWithoutPackageInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
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