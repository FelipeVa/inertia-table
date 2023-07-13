<?php

namespace FelipeVa\InertiaJsTableReact;

use Illuminate\Support\Enumerable;
use Inertia\Response;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class InertiaTableServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('inertia-table')
            ->hasConfigFile()
            ->hasViews();
    }

    public function bootingPackage(): void
    {
        Response::macro('getTableProps', function () {
            return $this->props['tableProps'] ?? [];
        });

        Response::macro('table', function (callable $tableBuilder = null) {
            $request = request();
            $table = new Table($request);

            if (! is_null($tableBuilder)) {
                $tableBuilder($table);
            }

            return $table->build($this);
        });

        Response::macro('tables', function (array $tables): Response {
            $response = $this;

            /** @var Enumerable<int, Table> $tables */
            $tablesCollection = collect($tables);

            $tablesCollection->each(fn (Table $table) => $table->build($response));

            /** @phpstan-ignore-next-line */
            return $response;
        });
    }
}
