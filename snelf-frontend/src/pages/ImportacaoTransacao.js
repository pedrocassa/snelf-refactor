import React from 'react'
import ImportacaoForm from '../components/forms/ImportacaoMedicamentoForm'
import Navbar from '../components/navbar/Navbar'
import ImportacaoTransacaoForm from '../components/forms/ImportacaoTransacaoForm'

export default function ImportacaoTransacao() {
    return (
        <div>
            <Navbar />
            <ImportacaoTransacaoForm />
        </div>
    )
}
