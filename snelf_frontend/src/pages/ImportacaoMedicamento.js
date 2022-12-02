import React from 'react'
import ImportacaoForm from '../components/forms/ImportacaoMedicamentoForm'
import Navbar from '../components/navbar/Navbar'
import ImportacaoMedicamentoForm from '../components/forms/ImportacaoMedicamentoForm'
import LoadingSpinner from './LoadingSpinner'

export default function ImportacaoMedicamento() {
    const [isLoading, setIsLoading] = React.useState(false);
    
    return (
        <div>
            <Navbar />
            {isLoading ? <LoadingSpinner /> : 
            <ImportacaoMedicamentoForm />}
        </div>
    )
}
