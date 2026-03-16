import React from 'react'
import { Navigate, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  return (
    <>
      <header>
        <Show when="signed-in">
          <SentryRoutes>
            <Route path='/' element={ <HomePage/> }/>
            <Route path='/auth' element={ <Navigate to={"/"} replace />} />
          </SentryRoutes>
        </Show>

        <Show when="signed-out">
          <SentryRoutes>
            <Route path='/auth' element={ <AuthPage/> }/>
            <Route path='*' element={<Navigate to={"/auth"} replace />} />
          </SentryRoutes>

        </Show>
      </header>
    </>
  )
}

export default App
