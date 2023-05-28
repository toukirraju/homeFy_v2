export default function Message({ justify, message, msgBG }) {
  return (
    <li className={`flex ${justify}`}>
      <div
        className={`relative max-w-xl rounded px-4 py-2 text-gray-700 shadow drop-shadow-md ${msgBG} dark:${msgBG} dark:bg-opacity-60 dark:text-gray-400`}
      >
        <span className="block">{message}</span>
      </div>
    </li>
  );
}
