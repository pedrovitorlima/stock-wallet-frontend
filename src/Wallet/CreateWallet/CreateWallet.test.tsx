/* eslint-disable testing-library/no-render-in-setup */
import { render, fireEvent, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiError } from "../../domain/error";
import WalletService from "../../service/WalletService";

import CreateWallet from "./CreateWallet"

describe('Given CreateWallet component', () => {

    beforeEach (() => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <CreateWallet />
            </QueryClientProvider>
        );
    });

    it ('should render a form', () => {
        screen.getByTestId('submitButton');
        screen.getByTestId('nameTextField');
        screen.getByTestId("createWalletHeader");
    });

    describe('WHEN I Submit a form with invalid inputs', () => {

        it('should render an error message when Name has more than 200 letter', async () => {
            const errorBody = '{"errors":[{"field":"name","description":"Name size should not be bigger than 200"}]}';
            makeServiceThrowError(errorBody);

            const walletNameField = screen.getByTestId('nameTextField');

            const bigText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga ducimus dignissimos laborum sed, porro, nemo accusamus non nihil itaque ipsum recusandae nulla eius officia dolorem. Quisquam autem placeat quae fuga quasi, corrupti atque totam qui unde amet et at sint pariatur nam ipsam distinctio quo laudantium voluptates nobis mollitia vitae. Quaerat itaque quibusdam est amet eum excepturi, tempora, eaque distinctio, dolorem quo pariatur consectetur dolorum sed animi expedita placeat aliquid labore quae voluptatum dicta doloremque fugiat! Obcaecati accusantium nemo facere quam distinctio quibusdam, praesentium blanditiis, eius amet iste, doloribus at. Dolorem beatae consequuntur totam aliquid, temporibus officiis nihil, mollitia id pariatur non, expedita nisi nemo corrupti aperiam. Qui voluptate temporibus adipisci voluptatem illum magni nisi ratione at, culpa minus dolore, excepturi fugit corrupti deserunt quo totam ducimus, vero ex doloribus ad quos! Dolore voluptatum unde quia deserunt dolorum. Sit facere accusamus nihil, quas ratione magni obcaecati, atque ab, commodi earum doloremque vitae suscipit! Illo eaque assumenda qui quia, amet quae voluptatem debitis. Sed architecto sint porro ad dolorem eligendi placeat voluptatum quo asperiores perspiciatis, maxime fugiat, voluptatem facere soluta et alias ipsam. Exercitationem numquam illo ratione rerum vero eum, molestiae odit non tempora, repellendus ea consequuntur fugiat. Expedita, dolorem quos.";
            fireEvent.change(walletNameField, { target: { value: bigText } });
            
            const button = screen.getByTestId('submitButton');
            fireEvent.click(button);
            
            await screen.findByText("Name size should not be bigger than 200");
        });

        it('should render the generic error message', async () => {
            const errorBody = '{"message": "There are validation errors","errors":[{"field":"name","description":"Name size should not be bigger than 200"}]}';
            makeServiceThrowError(errorBody);

            const walletNameField = screen.getByTestId('nameTextField');

            const bigText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga ducimus dignissimos laborum sed, porro, nemo accusamus non nihil itaque ipsum recusandae nulla eius officia dolorem. Quisquam autem placeat quae fuga quasi, corrupti atque totam qui unde amet et at sint pariatur nam ipsam distinctio quo laudantium voluptates nobis mollitia vitae. Quaerat itaque quibusdam est amet eum excepturi, tempora, eaque distinctio, dolorem quo pariatur consectetur dolorum sed animi expedita placeat aliquid labore quae voluptatum dicta doloremque fugiat! Obcaecati accusantium nemo facere quam distinctio quibusdam, praesentium blanditiis, eius amet iste, doloribus at. Dolorem beatae consequuntur totam aliquid, temporibus officiis nihil, mollitia id pariatur non, expedita nisi nemo corrupti aperiam. Qui voluptate temporibus adipisci voluptatem illum magni nisi ratione at, culpa minus dolore, excepturi fugit corrupti deserunt quo totam ducimus, vero ex doloribus ad quos! Dolore voluptatum unde quia deserunt dolorum. Sit facere accusamus nihil, quas ratione magni obcaecati, atque ab, commodi earum doloremque vitae suscipit! Illo eaque assumenda qui quia, amet quae voluptatem debitis. Sed architecto sint porro ad dolorem eligendi placeat voluptatum quo asperiores perspiciatis, maxime fugiat, voluptatem facere soluta et alias ipsam. Exercitationem numquam illo ratione rerum vero eum, molestiae odit non tempora, repellendus ea consequuntur fugiat. Expedita, dolorem quos.";
            fireEvent.change(walletNameField, { target: { value: bigText } });
            
            const button = screen.getByTestId('submitButton');
            fireEvent.click(button);
            
            await screen.findByText("There are validation errors");
        });

    })

    describe('WHEN I submit a form with valid inputs', () => { 

        it('should not render any errors', () => {
            const createFn = jest.fn((wallet) => {
                return Promise.resolve();
            });
        
            WalletService.create = createFn;

            const walletNameField = screen.getByTestId('nameTextField');
            const walletName = "small/valid wallet name";
            fireEvent.change(walletNameField, { target: { value: walletName } });
            
            const button = screen.getByTestId('submitButton');
            fireEvent.click(button);
            
            const errorMessage = screen.queryByTestId("errorMessage");
            expect(errorMessage).not.toBeInTheDocument();
        })
     })
})

function makeServiceThrowError(errorBody: string) {
    const apiError: ApiError = JSON.parse(errorBody);

    const createFn = jest.fn((wallet) => {
        return Promise.reject(apiError);
    });

    WalletService.create = createFn;
}