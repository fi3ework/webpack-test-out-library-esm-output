import type { FunctionComponent, ReactNode } from 'react';
import { defineEntries } from '../server.js';
import type { RouteProps, ShouldSkip } from './common.js';
import type { PathSpec } from '../lib/utils/path.js';
export declare function unstable_defineRouter(getPathConfig: () => Promise<Iterable<{
    path: PathSpec;
    isStatic?: boolean;
}>>, getComponent: (componentId: string, // "**/layout" or "**/page"
unstable_setShouldSkip: (val?: ShouldSkip[string]) => void) => Promise<FunctionComponent<RouteProps> | FunctionComponent<RouteProps & {
    children: ReactNode;
}> | {
    default: FunctionComponent<RouteProps>;
} | {
    default: FunctionComponent<RouteProps & {
        children: ReactNode;
    }>;
} | null>): ReturnType<typeof defineEntries>;
type IsValidPathItem<T> = T extends `/${infer _}` ? false : T extends '[]' | '' ? false : true;
type IsValidPath<T> = T extends `/${infer L}/${infer R}` ? IsValidPathItem<L> extends true ? IsValidPath<`/${R}`> : false : T extends `/${infer U}` ? IsValidPathItem<U> : false;
type HasSlugInPath<T, K extends string> = T extends `/[${K}]/${infer _}` ? true : T extends `/${infer _}/${infer U}` ? HasSlugInPath<`/${U}`, K> : T extends `/[${K}]` ? true : false;
type PathWithSlug<T, K extends string> = IsValidPath<T> extends true ? HasSlugInPath<T, K> extends true ? T : never : never;
type PathWithoutSlug<T> = T extends '/' ? T : IsValidPath<T> extends true ? HasSlugInPath<T, string> extends true ? never : T : never;
type CreatePage = <Path extends string, SlugKey extends string, WildSlugKey extends string>(page: {
    render: 'static';
    path: PathWithoutSlug<Path>;
    component: FunctionComponent<RouteProps>;
} | {
    render: 'static';
    path: PathWithSlug<Path, SlugKey>;
    staticPaths: string[] | string[][];
    component: FunctionComponent<RouteProps & Record<SlugKey, string>>;
} | {
    render: 'dynamic';
    path: PathWithoutSlug<Path>;
    component: FunctionComponent<RouteProps>;
} | {
    render: 'dynamic';
    path: PathWithSlug<Path, SlugKey | `...${WildSlugKey}`>;
    component: FunctionComponent<RouteProps & Record<SlugKey, string> & Record<WildSlugKey, string[]>>;
}) => void;
type CreateLayout = <T extends string>(layout: {
    render: 'static';
    path: PathWithoutSlug<T>;
    component: FunctionComponent<RouteProps & {
        children: ReactNode;
    }>;
}) => void;
export declare function createPages(fn: (fns: {
    createPage: CreatePage;
    createLayout: CreateLayout;
}) => Promise<void>): ReturnType<typeof defineEntries>;
export {};
