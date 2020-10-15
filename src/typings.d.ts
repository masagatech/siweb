/* SystemJS module definition */
declare var module: NodeModule;
declare var moment: any;
interface NodeModule {
  id: string;
}
declare module "*.json" {
  const value: any;
  export default value;
}

declare var common: any;