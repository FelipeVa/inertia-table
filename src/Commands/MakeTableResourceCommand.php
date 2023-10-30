<?php

namespace FelipeVa\InertiaJsTableReact\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeTableResourceCommand extends GeneratorCommand
{
    protected $signature = 'make:table-resource {name}';

    protected $description = 'Command description';

    protected $type = 'TableResource';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/table-resource.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\TableResources';
    }

    protected function getNameInput(): string
    {
        return trim($this->argument('name') . 'TableResource');
    }

    protected function replaceClass($stub, $name): string
    {
        $class = str_replace($this->getNamespace($name) . '\\', '', $name);

        return str_replace('{{ class }}', $class, $stub);
    }
}
