import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './App.jsx';

// Server entry used only at build time by prerender.js. The component tree here
// must match main.jsx exactly (StrictMode > ThemeProvider > Router > Routes) or
// hydration will mismatch.
export function render(url) {
  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ThemeProvider>
    </StrictMode>
  );
}
