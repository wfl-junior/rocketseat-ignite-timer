import { Fragment } from "react";
import { Button } from "./components/Button";

export const App: React.FC = () => (
  <Fragment>
    <Button variant="primary" />
    <Button variant="secondary" />
    <Button variant="success" />
    <Button variant="danger" />
    <Button />
  </Fragment>
);
