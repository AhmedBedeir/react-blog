function NoPostYet({ title, message }) {
  return (
    <div className="flex items-center justify-center w-full h-screen/2">
      <div className="text-gray-500 text-center">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}

export default NoPostYet;
