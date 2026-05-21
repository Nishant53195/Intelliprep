function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default PageHeader;