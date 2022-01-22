import { render, RenderResult, fireEvent } from "@testing-library/react"
import CreateWallet from "./CreateWallet"


describe('Given CreateWallet component', () => {


    let renderedComponent : RenderResult;
    beforeEach (() => {
        renderedComponent = render(<CreateWallet />);

    });

    test ('Then a form is rendered', () => {
        const button = renderedComponent.getByText("Submit", { selector: 'button' });
        const walletNameField = renderedComponent.getByLabelText('Name');
        const title = renderedComponent.getByText("Wallets / Create wallet", { selector: 'h3' })

        expect(button).toBeInTheDocument();
        expect(walletNameField).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });

    // describe('WHEN I Submit a form with invalid inputs', () => {

    //     test('AND the Name has more than 200 letter THAN it should show me an error message', () => {
    //         const walletNameField = renderedComponent.getByLabelText('Name');
    //         const bigText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque fuga ducimus dignissimos laborum sed, porro, nemo accusamus non nihil itaque ipsum recusandae nulla eius officia dolorem. Quisquam autem placeat quae fuga quasi, corrupti atque totam qui unde amet et at sint pariatur nam ipsam distinctio quo laudantium voluptates nobis mollitia vitae. Quaerat itaque quibusdam est amet eum excepturi, tempora, eaque distinctio, dolorem quo pariatur consectetur dolorum sed animi expedita placeat aliquid labore quae voluptatum dicta doloremque fugiat! Obcaecati accusantium nemo facere quam distinctio quibusdam, praesentium blanditiis, eius amet iste, doloribus at. Dolorem beatae consequuntur totam aliquid, temporibus officiis nihil, mollitia id pariatur non, expedita nisi nemo corrupti aperiam. Qui voluptate temporibus adipisci voluptatem illum magni nisi ratione at, culpa minus dolore, excepturi fugit corrupti deserunt quo totam ducimus, vero ex doloribus ad quos! Dolore voluptatum unde quia deserunt dolorum. Sit facere accusamus nihil, quas ratione magni obcaecati, atque ab, commodi earum doloremque vitae suscipit! Illo eaque assumenda qui quia, amet quae voluptatem debitis. Sed architecto sint porro ad dolorem eligendi placeat voluptatum quo asperiores perspiciatis, maxime fugiat, voluptatem facere soluta et alias ipsam. Exercitationem numquam illo ratione rerum vero eum, molestiae odit non tempora, repellendus ea consequuntur fugiat. Expedita, dolorem quos.";

    //         const button = renderedComponent.getByText("Submit", { selector: 'button' });
            
    //         fireEvent.change(walletNameField, { target: { value: bigText } });
    //         fireEvent.click(button);
            
    //         const error = renderedComponent.getByText('Wallet name should be less or equals 200 characters', { selector: 'p' });

    //         expect(error).not.toBeNaN();
    //     });

    // })

    // describe ('AND valid inputs', () => {
    //     describe ('WHEN I submit the form', () => {
    //         test ('THEN it should exibit ')
    //     })
    // })


    
})