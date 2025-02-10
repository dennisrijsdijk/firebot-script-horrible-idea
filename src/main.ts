import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { AngularJsFactory, AngularJsPage, UIExtension } from "./extension-types";
import { UIExtensionManager } from "./ui-extension-manager";

interface Params {
  message: string;
}

const superCoolService: AngularJsFactory = {
  name: "superCoolService",
  function: () => {
    const service: any = { };

    service.veryCoolNumber = () => Math.floor(Math.random() * 100);

    return service;
  }
};

const page: AngularJsPage = {
  id: "superCoolPage",
  name: "Super Cool Page™️",
  icon: "fa-trademark",
  type: "angularjs",
  template: `
    <div>
      <div>
        Today's Cool Number is: {{coolNumber}}
      </div>
    </div>
  `,
  controller: ($scope: any, superCoolService: any) => {
    $scope.coolNumber = superCoolService.veryCoolNumber();
  }
}

const extension: UIExtension = {
  id: "veryCoolExtension",
  pages: [ page ],
  providers: {
    factories: [ superCoolService ]
  }
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "UI Page Test",
      description: "A starter custom script for build",
      author: "SomeDev",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return {
      message: {
        type: "string",
        default: "Hello World!",
        description: "Message",
        secondaryDescription: "Enter a message here",
        title: "Hello!",
      },
    };
  },
  run: (runRequest) => {
    runRequest.modules.logger.info(runRequest.parameters.message);
    const uiExtensionManager = runRequest.modules.uiExtensionManager as UIExtensionManager;
    uiExtensionManager.registerUIExtension(extension);
  },
};

export default script;
