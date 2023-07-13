<?php

namespace FelipeVa\InertiaJsTableReact\Contracts;

/**
 * @property string $name
 * @property string $label
 * @property ?string $value
 */
interface TableComponent
{
    public static function make(string $name, ?string $label): self;
}
