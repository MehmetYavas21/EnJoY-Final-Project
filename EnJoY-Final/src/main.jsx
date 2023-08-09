import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  EventUserForm,
  loader as formLoader,
} from "./components/EventUserForm";
import { EventPage, loader as postLoader } from "./pages/EventPage";
import { EventsPage, loader as postListLoader } from "./pages/EventsPage";
import { User, loader as userLoader } from "./components/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditEvent, loader as editLoader } from "./components/ui/EditEvent";
import { NotFound } from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
      },
      {
        path: "/event/new",
        element: <EventUserForm />,
        action: ({ params, query }) => ({
          // Implement the action to handle event creation here
          // For example, you can pass the createEvent function to the EventUserForm component
          // and handle the form submission and event creation in the EventUserForm component itself
        }),
        loader: formLoader,
      },
      {
        path: `/event/edit/:eventId`,
        element: <EditEvent />,
        loader: editLoader,
      },
      {
        path: "/user/:userId",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
