declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "@mdx-js/react" {
  import { ComponentType, ReactElement, ReactNode } from "react";

  export interface MDXProviderProps {
    children: ReactNode;
    components?: MDXProviderComponents;
  }

  export interface MDXProviderComponents {
    [key: string]: ComponentType<any>;
  }

  export const MDXProvider: ComponentType<MDXProviderProps>;
}
