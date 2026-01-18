import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import BrickList from "./components/BrickList";
import "./App.css";
import {
  Button,
  Card,
  CardBody,
  Divider,
  HeroUIProvider,
  Tab,
  Tabs,
} from "@heroui/react";
import { AddBrickForm } from "./components/AddBrickForm";
import { PersistGate } from "redux-persist/integration/react";
import { ExportForm } from "./components/ExportForm";
import { ImportForm } from "./components/ImportForm";
import * as BI from "react-bootstrap-icons";
import { QRCode } from "./components/QRCode";

function App() {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="flex flex-col min-h-screen">
            <Card className="rounded-none lg:sticky top-0 z-10">
              <Button
                className="absolute font-semibold right-3 top-3 z-100"
                variant="light"
              >
                PickBrick
                <BI.Bricks />
              </Button>
              <CardBody>
                <div className="flex flex-col">
                  <Tabs color="primary" variant="solid" size="sm">
                    <Tab key="list" title="List">
                      <AddBrickForm />
                    </Tab>
                    <Tab key="import" title="Import/Export">
                      <div className="flex gap-3">
                        <ImportForm />
                        <ExportForm />
                        <QRCode />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </CardBody>
            </Card>
            <div className="flex flex-col grow">
              <div className="p-3 grow">
                <BrickList />
              </div>
              <Divider />
              <Card className="text-sm">
                <CardBody>
                  <p>
                    Made with <BI.Heart className="inline" /> by Noah Lange in
                    Madison, WI.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </HeroUIProvider>
  );
}

export default App;
