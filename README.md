# Typing Test

![image](https://user-images.githubusercontent.com/17731302/199082253-205c5b86-2449-4243-a3da-8796efd2941c.png)

Example project for typing tester in React

This project shows an example of typing test implementation in React.

1. React function components
1. React hooks
1. Functional store state calculation

Example of a running project can be seen in [github pages deployment](https://elpddev.github.io/typing-test/)

## Main Elements

### Component - TypingGame

The manager of the game. Uses hooks for store state of the game.

### Hook - useTypingGame

Store hook for managing a typing game.

### Hook - useTypingCapture

Utility hook to capture and deal with typing events.

### Store - Board/Word/Letter

State representation for the game.

Uses functional pattern of:

1. Simple structural representation of the pieces state. Board/Word/Letter.
1. Immutable functions per module for mutating the state for easier reasoning about state changes.
1. Smart immutable - tree include changed branch and unchanged branches - So change detection will stop at unchanged branches.

## Development

### Running Development Server

```shell
pnpm install
```

```shell
pnpm dev
```

### Deployment

There is an automatic deployment that is done through github workflow. Each push to `main` will activate the workflow and try to deploy to Github pages.
