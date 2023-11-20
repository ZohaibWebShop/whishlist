<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inertia Laravel Vite</title>
  {{-- @viteReactRefresh --}}
  @vite(['resources/js/app.jsx'])
  @inertiaHead
</head>
<body>
    <input type="hidden" id="api_key" value="{{ config('shopify-app.api_key') }}" />
    <input type="hidden" id="host" value="{{ request()->get('host') }}" />
  @inertia
</body>
</html>
