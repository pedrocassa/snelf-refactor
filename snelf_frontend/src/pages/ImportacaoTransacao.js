import React from 'react'
import ImportacaoForm from '../components/forms/ImportacaoMedicamentoForm'
import Navbar from '../components/navbar/Navbar'
import ImportacaoTransacaoForm from '../components/forms/ImportacaoTransacaoForm'
import LoadingSpinner from './LoadingSpinner'

export default function ImportacaoTransacao() {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div>
            <Navbar />
            {isLoading ? <LoadingSpinner /> : 
            <ImportacaoTransacaoForm />}
        </div>
    )
}
