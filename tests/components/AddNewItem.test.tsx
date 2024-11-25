import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddNewItem from "../../src/layout/AddNewItem"
import { BucketListProvider } from "../../src/context/bucketListContext"

describe('AddNewItem component', () => {
    it('should show 2 buttons and a new field to enter the bucket list element when clicking on "Add new item"', async () => {
        render(
        <BucketListProvider>
            <AddNewItem/>
        </BucketListProvider>
        );
        const addItemBtn = screen.getByRole('button', {name: /add/i});
        
        const user = userEvent.setup();
        await user.click(addItemBtn);

        /* Show new text field */
        expect(screen.getByPlaceholderText('Example: My First element')).toBeInTheDocument();

        /* Show 2 new buttons */
        const okBtn = screen.getByRole('button', {name: /ok/i});
        const cancelBtn = screen.getByRole('button', {name: /cancel/i});

        expect(okBtn).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
    })
})