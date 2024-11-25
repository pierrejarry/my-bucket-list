import { render, screen } from '@testing-library/react';
import ChooseBucketListTitle from '../../src/layout/ChooseBucketListTitle';
import { BucketListProvider } from '../../src/context/bucketListContext';
import userEvent from '@testing-library/user-event';

describe('ChooseBucketListTitle component', () => {
    function setup() {
        render(
            <BucketListProvider>
                <ChooseBucketListTitle />
            </BucketListProvider>
        );

        const title = screen.getByRole('heading', { name: /My Bucket List/i });
        const textFields = screen.getAllByRole('textbox');
        const validateButton = screen.getByRole('button', { name: /validate/i });
        const totalButtons = screen.getAllByRole('button');

        return {
            title,
            textFields,
            validateButton,
            totalButtons,
            user: userEvent.setup(), // Include userEvent to avoid multiple setups
        };
    }

    it('it shows a title, 2 text fields and 2 buttons (one button is disabled)', () => {
        const { 
            title, 
            textFields, 
            validateButton, 
            totalButtons 
        } = setup();

        /* Find title */
        expect(title).toBeInTheDocument();

        /* Find 2 text fields */
        expect(textFields).toHaveLength(2);

        /* Find 2 buttons */
        expect(totalButtons).toHaveLength(2);

        /* Validate button is disabled */
        expect(validateButton).toBeDisabled();
    });

    it('it the user writes a title, it enables the "Validate" button', async () => {
        const { user, validateButton } = setup();

        /* Find textfield to write the title */
        const titleField = screen.getByRole('textbox', { name: /choose a name/i });

        /* Enable button when user type something */
        await user.click(titleField);
        await user.type(titleField, 'test');

        expect(validateButton).toBeEnabled();
    })

    it('it clears the 2 text fields if the user wrote something and clicked on "Reset" button', async () => {
        const { user } = setup();

        /* Find 2 textfields and Reset button */
        const titleField = screen.getByRole('textbox', { name: /choose a name/i });
        const descriptionField = screen.getByRole('textbox', { name: /description/i });
        const resetButton = screen.getByRole('button', { name: /reset/i });

        /* User actions */
        await user.type(titleField, 'title');
        await user.type(descriptionField, 'description');
        await user.click(resetButton);

        /* Final result: text fields should be empty */
        expect(titleField).toHaveValue('');
        expect(descriptionField).toHaveValue('');
    })
})
