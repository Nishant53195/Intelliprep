function AuthError({
  message,
}) {
  if (!message)
    return null;

  return (
    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
      {message}
    </div>
  );
}

export default AuthError;