<?php

namespace FelipeVa\InertiaJsTableReact\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapInputName(SnakeCaseMapper::class)]
class FilterOption extends Data
{
    /**
     * @param  string  $value
     * @param  string  $label
     */
    public function __construct(
        public string $value,
        public string $label,
    ) {
    }
}
