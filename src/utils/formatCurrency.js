export default function formatCurrency(value) {
  const valueToString = parseFloat(value);

  const formattedValue = valueToString.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedValue;
}
