// Quando o formulário for enviado, vamos gerar o PDF
document.getElementById('certificadoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que o formulário recarregue a página

    // Coleta o nome do usuário
    var nome = document.getElementById('nome').value;

    // Envio para Google Forms
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdkeaDfu7iXLrG6GOHQ5NCC69F2KK4D4Q6Q_SMLTvfDIff8dA/formResponse";
  const formData = new FormData();
  formData.append("entry.1556172680", nome);

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

    // Cria um novo documento PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape'); // Criando PDF em modo paisagem

    // Caminho da imagem do certificado (certificado em branco em formato PNG)
    const imagemCertificado = 'certificado.png';  // Substitua por seu caminho de imagem real

    // Adicionando a imagem do certificado ao PDF
    doc.addImage(imagemCertificado, 'PNG', 10, 10, 280, 200);  // Ajuste a posição e o tamanho conforme necessário

    // Centralizando o nome do usuário
    doc.setFontSize(30);
    doc.text(nome, 150, 106, null, null, 'center'); // Nome do usuário centralizado no PDF

    // Gerando o PDF como uma URL para abrir em uma nova aba
    const pdfUrl = doc.output('bloburl'); // Cria uma URL para o PDF gerado

    // Abrindo o PDF em uma nova aba
    window.open(pdfUrl, '_blank');  // Abre o PDF em uma nova aba
});
