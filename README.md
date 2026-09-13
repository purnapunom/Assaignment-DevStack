## React Questions & Answers

### 1. What is JSX, and why is it used in React?
JSX (JavaScript XML) is a syntax extension that lets you write HTML-like markup directly inside JavaScript files. It is used in React because it makes building UI component structures readable, intuitive, and much easier to maintain than manually using `React.createElement()`.

### 2. What is the difference between props and state?
- **Props (Properties):** Read-only data passed down from a parent component to a child component. A child component cannot modify the props it receives.
- **State:** Local dynamic data managed within a component. When state changes, the component automatically re-renders to display updated information.

### 3. What does the useState hook do, and where did you use it in this project?
The `useState` hook allows functional components to store and manage local reactive state. In this project, `useState` is used to:
- `techs`: Hold the technology array loaded from `technologies.json`.
- `savedTechs`: Track technologies added by the user to "Your Stack".
- `isLoading`: Manage the loading spinner state while fetching data.
- `isMobileMenuOpen`: Toggle the responsive mobile navigation menu.

### 4. What does the useEffect hook do, and why did you need it to load the JSON data?
The `useEffect` hook handles side effects in functional components (such as data fetching or subscriptions). It was needed here to run an asynchronous `fetch('/technologies.json')` call once when the component initially mounts.

### 5. Why does every item in a .map() list need a unique key prop?
React relies on unique `key` props to track list items across re-renders. Keys help React's virtual DOM quickly identify which specific items have been added, modified, or removed without needlessly re-rendering the entire list.

### 6. What is conditional rendering? Show one place you used it.
Conditional rendering means rendering different UI elements based on specific conditions (using ternary operators or logical `&&` checks).

**Example from this project:** Displaying an empty stack message when no item is selected vs. displaying the list of saved items:
```jsx
{savedTechs.length === 0 ? (
  <div className="py-10 text-center text-xs text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
    No item added yet
  </div>
) : (
  <div className="space-y-3 mb-6 max-h-[420px] overflow-y-auto pr-1">
    {/* Map through saved stack items */}
  </div>
)}


### 7. **How do you pass data from a parent component to a child component, and how does a child send something back to the parent?**
- Parent to Child: The parent component passes data down to the child component as custom attributes called props (e.g., `<Card tech={item} />`).
- Child to Parent: The parent passes a callback function down as a prop to the child. When an action occurs in the child (such as a button click), the child invokes that function and passes data back up to the parent as arguments.
