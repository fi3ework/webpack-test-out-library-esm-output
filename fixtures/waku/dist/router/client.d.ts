import type { ReactNode, AnchorHTMLAttributes, ReactElement } from 'react';
import type { RouteProps } from './common.js';
declare global {
    interface ImportMeta {
        readonly env: Record<string, string>;
    }
}
type ChangeLocation = (path?: string, searchParams?: URLSearchParams, method?: 'pushState' | 'replaceState' | false, scrollTo?: ScrollToOptions | false) => void;
export declare function useChangeLocation(): ChangeLocation;
export declare function useLocation(): RouteProps;
export type LinkProps = {
    to: string;
    pending?: ReactNode;
    notPending?: ReactNode;
    children: ReactNode;
    unstable_prefetchOnEnter?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
export declare function Link({ to, children, pending, notPending, unstable_prefetchOnEnter, ...props }: LinkProps): ReactElement;
export declare function Router(): import("react").FunctionComponentElement<Omit<{
    initialInput?: string;
    initialSearchParamsString?: string;
    cache?: [[input: string, searchParamsString: string, setElements: (updater: Promise<Record<string, ReactNode>> | ((prev: Promise<Record<string, ReactNode>>) => Promise<Record<string, ReactNode>>)) => void, elements: Promise<Record<string, ReactNode>>]?];
    children: ReactNode;
}, "children">>;
export {};
