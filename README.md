# Employee Management Application

## Overview

##### IMPORTANT: **_Please go to `/admin-page` route manually and generate some employees initially_**

This project is a web application built with LitElement that manages employee data. It features employee listing, editing, adding, and deletion capabilities with support for pagination, different view modes (table and card), and internationalization.

## Features

- Display employees in table or card view
- Pagination support with configurable items per page
- Add, edit, and remove employees
- Bulk import and clear employee data
- Confirmation modals for user actions
- Localization support with dynamic language updates
- Admin page for managing settings like items per page and data generation (ADDITIONAL)

## NPM commands

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run test:coverage`
- `npm run build`

## Technologies and Libraries Used

- [LitElement](https://lit.dev/) for building web components
- [Vaadin Router](https://vaadin.com/router) for client-side routing
- Redux-style store for state management
- Custom elements for UI components (buttons, modals, tables, cards, pagination)
- Localization via a simple translation utility
- [Iconify](https://iconify.design/) for icons

## Project Structure

- `src/components` - reusable UI components and templates
- `src/pages` - page components (EmployeeListPage, EditEmployeePage, AdminPage)
- `src/store` - application state management and slices
- `src/utils` - utility functions such as mock data creation
- `src/localization` - translation files and helpers
- `src/tests` - unit tests for components and pages

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run a development server (e.g. using a simple HTTP server)
4. Open the app in your browser
5. Run tests with your preferred test runner

## Testing

Tests use [Vitest](https://vitest.dev/) and [@open-wc/testing](https://open-wc.org/testing/testing/) libraries focusing on:

- Component rendering and interaction
- Method invocation on user actions
- Store state changes reflected in the UI
