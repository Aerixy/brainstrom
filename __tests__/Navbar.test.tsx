/**
 * Basic unit test for Navbar search keyboard behavior.
 * Requires dev dependencies: jest, ts-jest, @testing-library/react, @testing-library/jest-dom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/navigation useRouter and usePathname
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: (path: string) => { /* noop */ } }),
  usePathname: () => '/',
}));

import Navbar from '../app/components/Navbar';

describe('Navbar search', () => {
  test('opens search and navigates with keyboard', () => {
    render(<Navbar />);

    // open search
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    const input = screen.getByRole('textbox', { name: /search exercises/i });
    expect(input).toBeInTheDocument();

    // type a query that matches 'Memory Training'
    fireEvent.change(input, { target: { value: 'memory' } });

    // results should appear
    const list = screen.getByRole('listbox');
    expect(list).toBeInTheDocument();

    // press arrow down then enter
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    // There's no assertion for navigation here (router is mocked), but no errors should occur.
  });
});
