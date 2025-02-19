export default function Home() {
  console.log('Esto se esta ejecutando en el servidor');
  const a = 3;
  const b = 5;
  return (
    <div>
      Hola mundo, la suma de {a} + {b} es {a + b}
      A es mayor que B: {a > b ? 'Si' : 'No'}
    </div>
  );
}