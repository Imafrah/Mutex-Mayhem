# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllHackathons*](#listallhackathons)
  - [*GetUserTeamAndProjects*](#getuserteamandprojects)
- [**Mutations**](#mutations)
  - [*CreateNewProject*](#createnewproject)
  - [*PostAnnouncement*](#postannouncement)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllHackathons
You can execute the `ListAllHackathons` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllHackathons(options?: ExecuteQueryOptions): QueryPromise<ListAllHackathonsData, undefined>;

interface ListAllHackathonsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllHackathonsData, undefined>;
}
export const listAllHackathonsRef: ListAllHackathonsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllHackathons(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllHackathonsData, undefined>;

interface ListAllHackathonsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllHackathonsData, undefined>;
}
export const listAllHackathonsRef: ListAllHackathonsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllHackathonsRef:
```typescript
const name = listAllHackathonsRef.operationName;
console.log(name);
```

### Variables
The `ListAllHackathons` query has no variables.
### Return Type
Recall that executing the `ListAllHackathons` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllHackathonsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllHackathonsData {
  hackathons: ({
    id: UUIDString;
    name: string;
    startDate: TimestampString;
    endDate: TimestampString;
    theme: string;
  } & Hackathon_Key)[];
}
```
### Using `ListAllHackathons`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllHackathons } from '@dataconnect/generated';


// Call the `listAllHackathons()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllHackathons();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllHackathons(dataConnect);

console.log(data.hackathons);

// Or, you can use the `Promise` API.
listAllHackathons().then((response) => {
  const data = response.data;
  console.log(data.hackathons);
});
```

### Using `ListAllHackathons`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllHackathonsRef } from '@dataconnect/generated';


// Call the `listAllHackathonsRef()` function to get a reference to the query.
const ref = listAllHackathonsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllHackathonsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.hackathons);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.hackathons);
});
```

## GetUserTeamAndProjects
You can execute the `GetUserTeamAndProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserTeamAndProjects(vars: GetUserTeamAndProjectsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;

interface GetUserTeamAndProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserTeamAndProjectsVariables): QueryRef<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
}
export const getUserTeamAndProjectsRef: GetUserTeamAndProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserTeamAndProjects(dc: DataConnect, vars: GetUserTeamAndProjectsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;

interface GetUserTeamAndProjectsRef {
  ...
  (dc: DataConnect, vars: GetUserTeamAndProjectsVariables): QueryRef<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
}
export const getUserTeamAndProjectsRef: GetUserTeamAndProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserTeamAndProjectsRef:
```typescript
const name = getUserTeamAndProjectsRef.operationName;
console.log(name);
```

### Variables
The `GetUserTeamAndProjects` query requires an argument of type `GetUserTeamAndProjectsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserTeamAndProjectsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserTeamAndProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserTeamAndProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserTeamAndProjectsData {
  user?: {
    displayName: string;
    email: string;
    teams_via_TeamMember: ({
      id: UUIDString;
      name: string;
      hackathon: {
        name: string;
      };
        projects_on_team: ({
          id: UUIDString;
          name: string;
          description?: string | null;
          submittedAt: TimestampString;
        } & Project_Key)[];
    } & Team_Key)[];
  };
}
```
### Using `GetUserTeamAndProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserTeamAndProjects, GetUserTeamAndProjectsVariables } from '@dataconnect/generated';

// The `GetUserTeamAndProjects` query requires an argument of type `GetUserTeamAndProjectsVariables`:
const getUserTeamAndProjectsVars: GetUserTeamAndProjectsVariables = {
  userId: ..., 
};

// Call the `getUserTeamAndProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserTeamAndProjects(getUserTeamAndProjectsVars);
// Variables can be defined inline as well.
const { data } = await getUserTeamAndProjects({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserTeamAndProjects(dataConnect, getUserTeamAndProjectsVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserTeamAndProjects(getUserTeamAndProjectsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserTeamAndProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserTeamAndProjectsRef, GetUserTeamAndProjectsVariables } from '@dataconnect/generated';

// The `GetUserTeamAndProjects` query requires an argument of type `GetUserTeamAndProjectsVariables`:
const getUserTeamAndProjectsVars: GetUserTeamAndProjectsVariables = {
  userId: ..., 
};

// Call the `getUserTeamAndProjectsRef()` function to get a reference to the query.
const ref = getUserTeamAndProjectsRef(getUserTeamAndProjectsVars);
// Variables can be defined inline as well.
const ref = getUserTeamAndProjectsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserTeamAndProjectsRef(dataConnect, getUserTeamAndProjectsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewProject
You can execute the `CreateNewProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewProject(vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface CreateNewProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
}
export const createNewProjectRef: CreateNewProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewProject(dc: DataConnect, vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface CreateNewProjectRef {
  ...
  (dc: DataConnect, vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
}
export const createNewProjectRef: CreateNewProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewProjectRef:
```typescript
const name = createNewProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewProjectVariables {
  teamId: UUIDString;
  hackathonId: UUIDString;
  name: string;
  description?: string | null;
  projectLink?: string | null;
  githubLink?: string | null;
}
```
### Return Type
Recall that executing the `CreateNewProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateNewProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewProject, CreateNewProjectVariables } from '@dataconnect/generated';

// The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`:
const createNewProjectVars: CreateNewProjectVariables = {
  teamId: ..., 
  hackathonId: ..., 
  name: ..., 
  description: ..., // optional
  projectLink: ..., // optional
  githubLink: ..., // optional
};

// Call the `createNewProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewProject(createNewProjectVars);
// Variables can be defined inline as well.
const { data } = await createNewProject({ teamId: ..., hackathonId: ..., name: ..., description: ..., projectLink: ..., githubLink: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewProject(dataConnect, createNewProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createNewProject(createNewProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateNewProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewProjectRef, CreateNewProjectVariables } from '@dataconnect/generated';

// The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`:
const createNewProjectVars: CreateNewProjectVariables = {
  teamId: ..., 
  hackathonId: ..., 
  name: ..., 
  description: ..., // optional
  projectLink: ..., // optional
  githubLink: ..., // optional
};

// Call the `createNewProjectRef()` function to get a reference to the mutation.
const ref = createNewProjectRef(createNewProjectVars);
// Variables can be defined inline as well.
const ref = createNewProjectRef({ teamId: ..., hackathonId: ..., name: ..., description: ..., projectLink: ..., githubLink: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewProjectRef(dataConnect, createNewProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## PostAnnouncement
You can execute the `PostAnnouncement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
postAnnouncement(vars: PostAnnouncementVariables): MutationPromise<PostAnnouncementData, PostAnnouncementVariables>;

interface PostAnnouncementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PostAnnouncementVariables): MutationRef<PostAnnouncementData, PostAnnouncementVariables>;
}
export const postAnnouncementRef: PostAnnouncementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
postAnnouncement(dc: DataConnect, vars: PostAnnouncementVariables): MutationPromise<PostAnnouncementData, PostAnnouncementVariables>;

interface PostAnnouncementRef {
  ...
  (dc: DataConnect, vars: PostAnnouncementVariables): MutationRef<PostAnnouncementData, PostAnnouncementVariables>;
}
export const postAnnouncementRef: PostAnnouncementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the postAnnouncementRef:
```typescript
const name = postAnnouncementRef.operationName;
console.log(name);
```

### Variables
The `PostAnnouncement` mutation requires an argument of type `PostAnnouncementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PostAnnouncementVariables {
  hackathonId: UUIDString;
  message: string;
}
```
### Return Type
Recall that executing the `PostAnnouncement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PostAnnouncementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PostAnnouncementData {
  announcement_insert: Announcement_Key;
}
```
### Using `PostAnnouncement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, postAnnouncement, PostAnnouncementVariables } from '@dataconnect/generated';

// The `PostAnnouncement` mutation requires an argument of type `PostAnnouncementVariables`:
const postAnnouncementVars: PostAnnouncementVariables = {
  hackathonId: ..., 
  message: ..., 
};

// Call the `postAnnouncement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await postAnnouncement(postAnnouncementVars);
// Variables can be defined inline as well.
const { data } = await postAnnouncement({ hackathonId: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await postAnnouncement(dataConnect, postAnnouncementVars);

console.log(data.announcement_insert);

// Or, you can use the `Promise` API.
postAnnouncement(postAnnouncementVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
});
```

### Using `PostAnnouncement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, postAnnouncementRef, PostAnnouncementVariables } from '@dataconnect/generated';

// The `PostAnnouncement` mutation requires an argument of type `PostAnnouncementVariables`:
const postAnnouncementVars: PostAnnouncementVariables = {
  hackathonId: ..., 
  message: ..., 
};

// Call the `postAnnouncementRef()` function to get a reference to the mutation.
const ref = postAnnouncementRef(postAnnouncementVars);
// Variables can be defined inline as well.
const ref = postAnnouncementRef({ hackathonId: ..., message: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = postAnnouncementRef(dataConnect, postAnnouncementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
});
```

