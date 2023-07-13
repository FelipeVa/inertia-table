<?php

namespace FelipeVa\InertiaJsTableReact\Contracts;

/**
 * @property string $name
 * @property string $label
 * @property ?string $value
 */
interface TableComponent
{
    /**
     * @param string $name
     * @param string|null $label
     * @return self
     */
    public static function make(string $name, ?string $label): self;
}
