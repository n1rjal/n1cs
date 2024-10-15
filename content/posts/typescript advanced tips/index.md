---
title: "I bet you don't know these five typescript tips"
description: >-
    This article challenges and helps you level up your understanding of typescript. These 5 tips will make your code better.
keywords: []
slug: "/@nirjalpaudel54312/i-bet-you-dont-use-these-typescript-tips-and-practices"
summary: >-
    This article challenges and helps you level up your understanding of typescript. These 5 tips will make you code better. Look out for dynamic parameters type 😉
tags:
  - typescript
categories:
  - tips and tricks
sitemap:
  changeFreq: ""
  disable: false
  filename: "sitemap.xml"
  priority: 1
params:
  author: "Nirjal Paudel"
date: "2024-10-15T00:28:47.959Z"
---

## Looking back

Around a year ago, I wrote an article saying “[I bet you don’t know these javascript tips and tricks](https://nirjalpaudel.com.np/posts/@nirjalpaudel54312/i-bet-you-dont-use-these-javascript-tricks-and-pratices-5ab5438ed4c8/)”. Well this is going to be an upgrade on that. I truly bet that you don’t use these typescript tips and tricks. So keeping the old vows, tell me how many you know and are being used in your day to day life. So let’s begin shall we ?

![image.webp](img/image.webp)

## The five tips

### 1. Using IDE to get the type of literals:

We can get the literals of each types in typescript. Here is an example for each of the major types and or mismatch. It comes pre-installed in Visual Studio Code. Hover with mouse over the element you want to see.

![Viewing the type in visual studio code using mouse hover](img/image%201.webp)

Viewing the type in visual studio code using mouse hover

If you use my neovim setup. Pressing `Ctrl + K` to get the type.

![Viewing the type in my neovim. Neovim config is used.](img/image%202.webp)

Viewing the type in my neovim. Neovim config is used.

> [https://github.com/n1rjal/init.lua/](https://github.com/n1rjal/init.lua/)
>

### 2. Making null safe

You can make a value that can be null or undefined in its definition act as if it is not null. Use the `!` operator which is non-null assertion operator. Let’s consider an interface given below.

```tsx
interface UserProfile {
  id: number;                  // required property
  name: string | null;          // can be string or null
  email?: string;               // optional property (can be undefined)
  phone?: string | null;        // optional and can be null
}

const user: UserProfile = {
  id: 1,
  name: null,                   // valid due to `string | null`
  // email is optional, so it's not provided
  phone: null                   // valid due to `string | null | undefined`
};

function printName(name:string){
    return name + "Hello"
}

```

![Before: Without non null assertion operator](img/image%203.webp)

Before: Without non null assertion operator

Here you can see that the type is `string|null|undefined` and it cannot be assigned to parameter `string`

![After: With not null assertion operator](img/image%204.webp)

After: With not null assertion operator

With the introduction of `!`, we can see that the type is same but the function accepts the argument.

> Using this argument will not prevent any error. Incase if the value of phone is actually null
>

### 3. Getting parameters type for a method from library

Lets assume that you are using a library. One of the popular library you will use. Lets assume the library has a function who 1st argument is something that is not exported.

```tsx
 // lets asssume that this interface is not exportted by the library
 // How can we get the same interface without using DatabaseConnectionParams
interface DatabaseConnectionParams{
  host:string,
  port: number,
  user: string,
  password: string,
}

function connectToDatabase(params:DatabaseConnectionParams){
  return `CONNECTED to ${params.host}:${params.port}`;
}

const connectionParams = {
  host:"localhost",
  port: 5432,
  user: "testuser",
  password:"test12345",
}

connectToDatabase(connectionParams);
```

> You can also use ReturnType for to get the return value type
>

We can use the following pattern to get the above interface.

![image.webp](img/image%205.webp)

> We can use types like [0] for type and [”methodName”] for accessing methods in a class
>

Here we can see that we used the following operators. `Parameters` `typeof` and `[0]`

Here are the breakdown of each operators:

1. **Parameters** is used to get all the parameters of a function or method. It will return every type of parameters for each arguments of the function in tuple form.
2. **typeof**: typeof operator is used when we want to get the type of an typescript legal literal.
3. **[0]:** Here we used [0] to get the type of tuple parameters.

### 4. Not using Readonly, Pick, Omit, and Partial

In most projects, I see code missing the opportunity to the use of Readonly, Pick, Omit and Partial. Look on your code once more and look into how you can reuse it. Here is how they work.

1. **readonly:** The readonly utility type makes all properties of an object immutable, meaning they cannot be modified after the object is created.

```tsx
type Person = {
  name: string;
  age: number;
};

const person: Readonly<Person> = {
  name: "John",
  age: 30,
};

person.age = 31; // Error: Cannot assign to 'age' because it is a read-only property.
```

1. **omit:** The Omit utility type creates a new type by removing one or more keys from an existing type.

```tsx
type Person = {
  name: string;
  age: number;
  address: string;
};

type WithoutAddress = Omit<Person, 'address'>;
// This results in a type that has 'name' and 'age' but no 'address'
```

1. **pick:** The Pick utility type creates a new type by selecting a subset of properties from an existing type.

```tsx
type Person = {
  name: string;
  age: number;
  address: string;
};

type NameAndAge = Pick<Person, 'name' | 'age'>;
// This results in a type that only has 'name' and 'age'
```

1. **partial:** The Partial utility type makes all properties of an object optional.

```tsx
type Person = {
  name: string;
  age: number;
  address: string;
};

const partialPerson: Partial<Person> = {
  name: "John",
};
// 'age' and 'address' are optional now.
```

### 4. Conditional Types

**Conditional Types** provide a way to introduce logic to type definitions. They are similar to conditional expressions (if statements) in regular JavaScript, but they operate at the type level.

Here is an structure of typescript types

```tsx
T extends U ? X : Y
```

***“If type T extends (or is assignable to) type U, then use type X, otherwise use type Y.”***

Here is an example of how to use conditional types:

```tsx
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>; // "Yes"
type B = IsString<number>; // "No"
```

### 5. Dynamic parameter type

Dynamic types can be achieved in typescript and is really useful when making a library or making types for some complex code.

Below is an example when I used when making a mail library which will take enum and some object with interface changing based on the enum value provided. Mostly useful for email sending library or web-socket library.

```tsx
type Role = "admin" | "user";

interface BaseUser {
  name: string;
}

type UserWithRole<T extends Role> = T extends "admin"
  ? BaseUser & { permissions: string[] }
  : BaseUser;

const adminUser: UserWithRole<"admin"> = {
  name: "Alice",
  permissions: ["read", "write", "delete"],
};

const regularUser: UserWithRole<"user"> = {
  name: "Bob",
  // No 'permissions' field here
};
```

This can be useful when making complex types. Here is an example of how I use it for email clients. Here depending upon the type of T, type of K will be changed.

```tsx

export enum EmailTemplateEnum {
    NewInquiryReceivedToAdmin = 4590262,
    NewInquiryReceivedToClient = 4576327,
    BidAcceptedOnOrderForClient = 4659400,
    BidAcceptedOnOrderForPartner = 4659358,
    BidEditedByPartnerForAdmin = 4659320,
    BidReceivedOnOrderForAdmin = 4659305,
    OrderBookingReceivedToAdmin = 4659255,
    OrderBookingReceivedToClient = 4659177,
    NotifyPartnerForOrderCreation = 4659288,
    OrderConfirmationByClientForPartner = 4659479,

    PaymentSuccessfulForClient = 4659518,
    PaymentSuccessfulForAdmin = 4736125,
    PaymentSuccessfulForPartner = 4736123,

    OrderFollowUp1 = 4659643,
    OrderFollowUp2 = 4659602,
    OrderFollowUp3 = 4659657,
}

// for auto complete based on choice of enum
// we will need to create all these 7 interface
export type EmailEnumToEmailVariableInterfaceMap = {
    [EmailTemplateEnum.NewInquiryReceivedToAdmin]: NewInquiryReceivedToAdminInterface;
    [EmailTemplateEnum.NewInquiryReceivedToClient]: NewInquiryReceivedToClientInterface;
    [EmailTemplateEnum.BidAcceptedOnOrderForClient]: BidAcceptedOnOrderForClientInterface;
    [EmailTemplateEnum.BidAcceptedOnOrderForPartner]: BidAcceptedOnOrderForPartnerInterface;
    [EmailTemplateEnum.BidEditedByPartnerForAdmin]: BidEditedByPartnerForAdminInterface;
    [EmailTemplateEnum.OrderBookingReceivedToAdmin]: OrderBookingReceivedToAdminInterface;
    [EmailTemplateEnum.OrderBookingReceivedToClient]: OrderBookingReceivedToClientInterface;
    [EmailTemplateEnum.NotifyPartnerForOrderCreation]: NotifyPartnerForOrderCreationInterface;
    [EmailTemplateEnum.OrderConfirmationByClientForPartner]: OrderConfirmationByClientForPartnerInterface;
    [EmailTemplateEnum.BidReceivedOnOrderForAdmin]: BidReceivedOnOrderForAdminInterface;
    [EmailTemplateEnum.OrderFollowUp1]: OrderFollowUpInterface;
    [EmailTemplateEnum.OrderFollowUp2]: OrderFollowUpInterface;
    [EmailTemplateEnum.OrderFollowUp3]: OrderFollowUpInterface;

    [EmailTemplateEnum.PaymentSuccessfulForClient]: PaymentSuccessfulForClientInterface;
    [EmailTemplateEnum.PaymentSuccessfulForPartner]: PaymentSuccessfulForPartnerInterface;
    [EmailTemplateEnum.PaymentSuccessfulForAdmin]: PaymentSuccessfulForAdminInterface;
};

async sendEmail<
        T extends EmailTemplateEnum,
        K extends EmailEnumToEmailVariableInterfaceMap[T],
    >(emailArgs: EmailProducerInterface<T, K>){}
```

Upon using the `sendEmail` method, we will get the following types changes. Look below how the variable type/interface changes for different enum values.

![image.webp](img/image%206.webp)

![image.webp](img/image%207.webp)

![image.webp](img/image%208.webp)

## Conclusion

Tell me how many did you know, and how many did you get right in the comments below. Thank you for reading this far.
