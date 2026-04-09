import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Announcement_Key {
  id: UUIDString;
  __typename?: 'Announcement_Key';
}

export interface CreateNewProjectData {
  project_insert: Project_Key;
}

export interface CreateNewProjectVariables {
  teamId: UUIDString;
  hackathonId: UUIDString;
  name: string;
  description?: string | null;
  projectLink?: string | null;
  githubLink?: string | null;
}

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

export interface GetUserTeamAndProjectsVariables {
  userId: UUIDString;
}

export interface Hackathon_Key {
  id: UUIDString;
  __typename?: 'Hackathon_Key';
}

export interface ListAllHackathonsData {
  hackathons: ({
    id: UUIDString;
    name: string;
    startDate: TimestampString;
    endDate: TimestampString;
    theme: string;
  } & Hackathon_Key)[];
}

export interface PostAnnouncementData {
  announcement_insert: Announcement_Key;
}

export interface PostAnnouncementVariables {
  hackathonId: UUIDString;
  message: string;
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Score_Key {
  id: UUIDString;
  __typename?: 'Score_Key';
}

export interface TeamMember_Key {
  userId: UUIDString;
  teamId: UUIDString;
  __typename?: 'TeamMember_Key';
}

export interface Team_Key {
  id: UUIDString;
  __typename?: 'Team_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllHackathonsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllHackathonsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllHackathonsData, undefined>;
  operationName: string;
}
export const listAllHackathonsRef: ListAllHackathonsRef;

export function listAllHackathons(options?: ExecuteQueryOptions): QueryPromise<ListAllHackathonsData, undefined>;
export function listAllHackathons(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllHackathonsData, undefined>;

interface GetUserTeamAndProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserTeamAndProjectsVariables): QueryRef<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserTeamAndProjectsVariables): QueryRef<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
  operationName: string;
}
export const getUserTeamAndProjectsRef: GetUserTeamAndProjectsRef;

export function getUserTeamAndProjects(vars: GetUserTeamAndProjectsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;
export function getUserTeamAndProjects(dc: DataConnect, vars: GetUserTeamAndProjectsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserTeamAndProjectsData, GetUserTeamAndProjectsVariables>;

interface CreateNewProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
  operationName: string;
}
export const createNewProjectRef: CreateNewProjectRef;

export function createNewProject(vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;
export function createNewProject(dc: DataConnect, vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface PostAnnouncementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PostAnnouncementVariables): MutationRef<PostAnnouncementData, PostAnnouncementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PostAnnouncementVariables): MutationRef<PostAnnouncementData, PostAnnouncementVariables>;
  operationName: string;
}
export const postAnnouncementRef: PostAnnouncementRef;

export function postAnnouncement(vars: PostAnnouncementVariables): MutationPromise<PostAnnouncementData, PostAnnouncementVariables>;
export function postAnnouncement(dc: DataConnect, vars: PostAnnouncementVariables): MutationPromise<PostAnnouncementData, PostAnnouncementVariables>;

