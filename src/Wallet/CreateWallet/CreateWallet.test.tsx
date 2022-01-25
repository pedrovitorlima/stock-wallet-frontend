/* eslint-disable testing-library/no-render-in-setup */
import { render, fireEvent, screen } from "@testing-library/react"
import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

import CreateWallet from "./CreateWallet"

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Given CreateWallet component', () => {

    beforeEach (() => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <CreateWallet />
            </QueryClientProvider>
        );
    });

    test ('Then a form is rendered', () => {
        const button = screen.getByText("Submit", { selector: 'button' });
        const walletNameField = screen.getByLabelText('Name');
        const title = screen.getByText("Wallets / Create wallet", { selector: 'h3' })

        expect(button).toBeInTheDocument();
        expect(walletNameField).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    describe('WHEN I Submit a form with invalid inputs', () => {

        test('AND the Name has more than 200 letter THAN it should show me an error message', async () => {
            
            const expectedError = 'Wallet name should be less or equals 200 characters';
            mockedAxios.post.mockRejectedValueOnce(new Error(expectedError));

            const walletNameField = screen.getByLabelText('Name');
            const bigText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga ducimus dignissimos laborum sed, porro, nemo accusamus non nihil itaque ipsum recusandae nulla eius officia dolorem. Quisquam autem placeat quae fuga quasi, corrupti atque totam qui unde amet et at sint pariatur nam ipsam distinctio quo laudantium voluptates nobis mollitia vitae. Quaerat itaque quibusdam est amet eum excepturi, tempora, eaque distinctio, dolorem quo pariatur consectetur dolorum sed animi expedita placeat aliquid labore quae voluptatum dicta doloremque fugiat! Obcaecati accusantium nemo facere quam distinctio quibusdam, praesentium blanditiis, eius amet iste, doloribus at. Dolorem beatae consequuntur totam aliquid, temporibus officiis nihil, mollitia id pariatur non, expedita nisi nemo corrupti aperiam. Qui voluptate temporibus adipisci voluptatem illum magni nisi ratione at, culpa minus dolore, excepturi fugit corrupti deserunt quo totam ducimus, vero ex doloribus ad quos! Dolore voluptatum unde quia deserunt dolorum. Sit facere accusamus nihil, quas ratione magni obcaecati, atque ab, commodi earum doloremque vitae suscipit! Illo eaque assumenda qui quia, amet quae voluptatem debitis. Sed architecto sint porro ad dolorem eligendi placeat voluptatum quo asperiores perspiciatis, maxime fugiat, voluptatem facere soluta et alias ipsam. Exercitationem numquam illo ratione rerum vero eum, molestiae odit non tempora, repellendus ea consequuntur fugiat. Expedita, dolorem quos.";
            fireEvent.change(walletNameField, { target: { value: bigText } });
            
            const button = screen.getByText("Submit", { selector: 'button' });
            fireEvent.click(button);
            
            const error = await screen.findByText(expectedError, { selector: 'p' });

            expect(error).not.toBeNaN();
        });

    })
})