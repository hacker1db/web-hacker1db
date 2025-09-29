declare module "*.mdx" {
  import { ComponentType } from "react";
  interface MDXProps {
    [key: string]: unknown;
  }
  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}

declare module "@mdx-js/react" {
  import { ComponentType, ReactNode } from "react";

  export interface MDXProviderProps {
    children: ReactNode;
    components?: MDXProviderComponents;
  }

  export interface MDXProviderComponents {
    [key: string]: ComponentType<unknown>;
  }

  export const MDXProvider: ComponentType<MDXProviderProps>;
}
