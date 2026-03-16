import React from 'react'
import { Navigate, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react';
import * as Sentry from "@sentry/react";
import CallPage from './pages/CallPage';

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const {isSignedIn, isLoaded} = useAuth();

  if(!isLoaded) return null;

  return (
          <SentryRoutes>
            <Route path='/' element={isSignedIn ? <HomePage/> : <Navigate to={"/auth"} replace />}/>
            <Route path='/auth' element={!isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace />} />
         
            <Route path='/call/:id' element={isSignedIn ? <CallPage/> : <Navigate to={"/auth"} replace />}/>
            <Route path='*' element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />} />
          </SentryRoutes>
  );
};

export default App


// return (
//     <>
//       <header>
//         <Show when="signed-in">
//           <SentryRoutes>
//             <Route path='/' element={ <HomePage/> }/>
//             <Route path='/auth' element={ <Navigate to={"/"} replace />} />
//           </SentryRoutes>
//         </Show>

//         <Show when="signed-out">
//           <SentryRoutes>
//             <Route path='/auth' element={ <AuthPage/> }/>
//             <Route path='*' element={<Navigate to={"/auth"} replace />} />
//           </SentryRoutes>

//         </Show>
//       </header>
//     </>
//   )