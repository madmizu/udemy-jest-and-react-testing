import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'Medium Violet Red' })
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: 'Midnight Blue' });
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render (<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toBeDisabled();
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  expect(checkbox).not.toBeChecked();
});

test('checkbox disabled button on first click and enables on second click', () => {
  render (<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue'});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test ('button is grey when disabled', () => {
  render (<App />);
  const checkbox = screen.getByRole('checkbox',{ name: 'Disable button'});
  const colorButton = screen.getByRole('button',{ name: 'Change to Midnight Blue'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner captial letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})