import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import IconButton from 'src/components/IconButton';

describe('IconButton', () => {
    it('renders the button with accessible label', () => {
        render(
            <IconButton label="Close">
                <svg data-testid="icon" />
            </IconButton>
        );

        const button = screen.getByRole('button', { name: /close/i });
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(
            <IconButton label="Close" onClick={handleClick}>
                <svg />
            </IconButton>
        );

        const button = screen.getByRole('button', { name: /close/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        render(
            <IconButton label="Close" className="custom-class">
                <svg />
            </IconButton>
        );

        const button = screen.getByRole('button', { name: /close/i });
        expect(button).toHaveClass('custom-class');
    });
});
