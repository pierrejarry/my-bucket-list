import React from "react";
import { render, screen } from '@testing-library/react';
import { BucketListProvider } from "../../src/context/bucketListContext";
import userEvent from "@testing-library/user-event";
import BucketList from "../../src/layout/BucketList";

describe('BucketList component', () => {

    function setup(list) {
        render(
            <BucketListProvider
                value={{
                    list: list
                }}
            >
                <BucketList />
            </BucketListProvider>
        );
    }

    it('should show a message if the Bucket List is empty', () => {
        setup([]);
        
        /* Show heading */
        const heading = screen.getByRole('heading', { name: /Your Bucket List is empty!/i });
        expect(heading).toBeInTheDocument();
        
        /* Show image */
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    })

    it('should show a new field to enter an item when clicking on "Add a new element" and 2 buttons', async () => {
        setup([]);
        
        /* Find button and click */
        const button = screen.getByRole('button', { name: /add/i });
        expect(button).toBeInTheDocument();
    
        const user = userEvent.setup();
        await user.click(button);

        /* The field to enter a new element should appear */
        const newElemField = screen.getByRole('textbox');
        expect(newElemField).toBeInTheDocument();

        /* The 2 buttons Cancel and OK should be found */
        const cancelBtn = screen.getByRole('button', {name: /cancel/i});
        expect(cancelBtn).toBeInTheDocument();

        const okBtn = screen.getByRole('button', {name: /ok/i});
        expect(okBtn).toBeInTheDocument();
    })

    it('it should show a list if the list from the context is not empty', async () => {
        const list = [
            {
                checked: false,
                description: 'First element'
            },
            {
                checked: false,
                description: 'Second element'
            }
        ]

        setup(list);
        
        list.forEach(element => {
            expect(screen.getByText(element.description)).toBeInTheDocument()
        });

        /* Shows a "Remove element button" for each list item */
        expect(screen.getAllByRole('button', {name: /remove/i})).toHaveLength(2);
    })

})